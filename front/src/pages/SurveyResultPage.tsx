import React, { Component } from "react";
import { Header } from "../components";
import {Link} from 'react-router-dom'
import axios from "axios";
import queryString from "query-string";
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CloseIcon from '@material-ui/icons/Close';
import flo from 'assets/badge/TopUser.png'

interface ResultProps {}

class SurveyResultPage extends Component<ResultProps> {
  state = {
    perfumes: [
      { name: "name", thumbnail: "/static", brand: { name: "" }, price: 0, id: 0, total_review: 0 },
    ],
  };
  initializeResult = () => {
    const queryParams: object = queryString.parse(window.location.search);
    console.log(queryParams);
    const form_data = new FormData();

    for (let key in queryParams) {
      form_data.append(key, queryParams[key]);
    }
    axios
      .post("http://i02b208.p.ssafy.io:8000/perfumes/survey/", form_data)
      .then((r) => {
        console.log(r);
        this.setState({ perfumes: r.data });
      });
    return 1;
  };
  componentDidMount() {
    this.initializeResult();
  }
  makeComma = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  render() {
    return (
      <div>
        <Header />
        <div className="result_box">
          <div className="black_window">
            <div className="black_window_left">
            <FontAwesomeIcon className="black_window_emoji" icon={faUser} />
            result</div>
            <Link to="/"><CloseIcon /></Link>
          </div>
          
          <div className="result-title">
            <div className="img_reco_title">
              <img src={flo} alt=""/>
              Recommended Perfumes by Laure_Richis
            </div>
            <hr/>
            <small className="reco_for_u right">당신에게 추천하는 향수 15선</small>
          </div>
          <div className="result-grid p-4">
            {this.state.perfumes.length > 1 ? (
              this.state.perfumes.map((perfume, rank) => (
                <Link  className="each-grid-result" style={{backgroundImage: `url(${perfume.thumbnail})`}} to={`detail/${perfume.id}`} key={perfume.id + 'lto'}>
                  <h1 className="result-rank">#{rank + 1}</h1>
                  <div className="result-header py-2">
              
              <p style={{fontSize: '0.6vw'}}>{perfume.brand.name}</p>
                    <p>#{rank + 1}- {perfume.name}</p>
                    <p className="result-price" >{this.makeComma(Number(perfume.price.toFixed(0)))}원</p>
                    <small>클릭하여 바로가기</small>
                  </div>
                </Link>
              ))
            ) : (
              <h1 style={{position: 'absolute'}}>결과가 없어용</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SurveyResultPage;
