import React, { Component } from "react";
import { Header } from "../components";
import axios from "axios";
import { Tabs, Tab, Button } from "react-materialize";
import "css/ExpSurveyPage.css";
import { Link } from "react-router-dom";

interface ExpSurveyPageProps {
  gender: number;
  location: any;
}

class ExpSurveyPage extends Component<ExpSurveyPageProps> {
  state = {
    famous: [] as any[],
    isSubmitted: false,
    result: [] as any[],
    focused: "26120000",
  };
  componentDidMount() {
    this.initializeFamousInfo();
  }
  initializeFamousInfo = async () => {
    await axios
      .get(
        `http://i02b208.p.ssafy.io:8000/perfumes/famous/?gender=${this.props.location.state}`
      )
      .then((r) => {
        let flist = r.data.map((e) => {
          e["checked"] = false;
          return e;
        });
        this.setState({ famous: flist });
      });
  };
  range = (start, end) => {
    const arr = [] as number[];
    const length = end - start;
    for (let i = 0; i <= length; ++i) {
      arr[i] = start;
      ++start;
    }
    return arr;
  };
  handleFamSel = (id) => {
    const newArr = [] as any[];
    const oldArr = this.state.famous;
    for (let i = 0; i < oldArr.length; ++i) {
      if (i === id) {
        oldArr[i].checked = !oldArr[i].checked;
        newArr.push(oldArr[i]);
      } else {
        newArr.push(oldArr[i]);
      }
    }

    this.setState({ famous: newArr });
  };
  handleSubmit = () => {
    let result = [] as any[];
    this.state.famous.map((f) => {
      if (f.checked) {
        result = result.concat(
          f.similar.slice(1, f.similar.length - 1).split(", ")
        );
      }
    });
    let single = result.reduce(( a, b ) => {
      if( a.indexOf(b) < 0 ) a.push(b) ;
      return a ;
    }, [])
    single = single.sort(function(){
      return Math.random() - Math.random()
    })
    this.setState({ result: single.slice(1,11) });
    this.setState({ isSubmitted: true });
  };
  perfumeNow = () => 1;

  render() {
    const length = this.state.famous.length;
    let end = length / 8 + 1;
    const arr = this.range(1, end);
    return (
      <div style={{overflowY: 'hidden', height: '100vh'}}>
        <Header />
        {!this.state.isSubmitted ? (
          <section>
            <h1
              className="header-quotes"
            >
              마음에 드는 향수를 모두 선택해주세요.
            </h1>
            <div className="container" style={{height: '40vw'}}>
              <Tabs
                className=""
                options={{
                  swipeable: false,
                }}
              >
                {arr.map((tabidx) => (
                  <Tab
                    key={tabidx + "keyfortab"}
                    className="famous-survey-tab"
                    options={{
                      duration: 300,
                      onShow: null,
                      responsiveThreshold: Infinity,
                      swipeable: false,
                    }}
                    title={`PAGE ${tabidx}`}
                  >
                    <section className="famous-selection-box">
                      {this.state.famous.map((p, pidx) => {
                        if (tabidx * 8 - 8 <= pidx && pidx < tabidx * 8) {
                          return (
                            <div
                              key={p.id + "key"}
                              onClick={() => this.handleFamSel(pidx)}
                              style={p.checked ? { background: "#e0e0e0" } : {}}
                            >
                              <img
                                className="famous-selection-img"
                                src={p.thumbnail}
                                alt="1"
                              />
                              <p className="famous-selection-perfume-name">
                                {p.name}
                              </p>
                            </div>
                          );
                        }
                      })}
                    </section>
                  </Tab>
                ))}
              </Tabs>
              <Button className="submit-exp-survey" onClick={this.handleSubmit}>
                추천받기
              </Button>
            </div>
          </section>
        ) : (
          <section style={{ marginTop: 80 }} >
            <div>
              <h4 className="header-quotes">로르리시가 추천하는 당신에게 꼭 맞는 향수입니다.</h4>
            </div>
            <div className="exp-survey-result">
              {this.state.result.map((r) => (
                <Link to={`/detail/${r}`}>
                <div style={{backgroundImage: `url(http://i02b208.p.ssafy.io:8000/staticfiles/images/${r}.jpg)`}}>
                  </div>
                  
                  </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
}
export default ExpSurveyPage;
