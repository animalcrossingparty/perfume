import React, { Component, createRef } from "react";
import { ConversationalForm } from "conversational-form";
import {Checkbox, Button} from 'react-materialize'
import axios from "axios";
import queryString from "query-string";
import user_anon from 'assets/user_anon.png'
import richis from 'assets/member/4.png'
interface ConvFormProps {
  formFields: any;
}

class ConvForm extends Component<ConvFormProps> {
  state = {
    endconv: false,
    prevAnswers: {age:'',gender:'',include:[],seasons:[]},
    notes: [{kor_name:'', id:0},{kor_name:'', id:0}]
  }
  private convRef = createRef<HTMLDivElement>();
  flowCallback = (dto, success, error) => {
    if (dto.tag.name === "include") {
      if (dto.tag.value.length === 3) {
        console.log(success());
      } else {
        return error();
      }
    }
    return success();
  };

  componentDidMount() {
    this.setState({endconv: false})
    const node = this.convRef.current;
    const cf = ConversationalForm.startTheConversation({
      options: {
        theme: "purple",
        submitCallback: this.submitCallback,
        flowStepCallback: this.flowCallback,
        hideUserInputOnNoneTextInput: false,
        preventAutoFocus: true,
        loadExternalStyleSheet: true,
        context: node,
        userInterfaceOptions: {},
      showProgressBar: false,
      animationsEnabled: true,
      userImage: `${user_anon}`,
      robotImage: `${richis}`,
        dictionaryData: {
          "input-placeholder": "여기에 답변을 입력해주세요.",
        },
      },
      tags: this.props.formFields,
    });
    if (node) {
      node.appendChild(cf.el);
    }
  }
  endConversation = () => {
    this.setState({endconv: true})
    return 1
  }
  submitSurvey = (e) => {
    e.preventDefault()
    console.log(this.state.prevAnswers)
    const nodeList = e.target.querySelectorAll('input')
    let sn = [] as number[]
    for (let i=0;i < nodeList.length;++i) {
      if (nodeList[i].checked) {
        sn.push(Number(nodeList[i].value))
      }
    }
    const notes = sn.join(',')
    const age = Number(this.state.prevAnswers.age)
    const gender = Number(this.state.prevAnswers.gender[0])
    const category = this.state.prevAnswers.include.join(',')
    const season = this.state.prevAnswers.seasons.join(',')
    const query = {notes, gender, category,age, season}
    window.history.pushState('','',`/result?${queryString.stringify(query)}`)
    window.history.go(0)
  }
  submitCallback = (e) => {
    const data = e.getFormData(true);
    const include = data.include;
    this.setState({prevAnswers: data})
    let query = `${Number(include[0])},${Number(include[1])},${Number(include[2])}`;
    return axios
      .get(`http://i02b208.p.ssafy.io:8000/perfumes/survey/?category=${query}`)
      .then(r => {
        let newNotes = r.data
        this.setState({endconv: true})
        this.setState({notes: newNotes})
        e.remove()
      })
  }

  render() {
    return (
      <div>
        
        {this.state.endconv === false ? (
          <div ref={this.convRef} />
        ) : (
          <div>
          <h4 className="select-u-want">아래에서 마음에 드는 노트(향기)를 골라주세요. (두 개 이상)</h4>
            <form className="note-select-wrapper grid-templ" onSubmit={this.submitSurvey}>
            {this.state.notes.map((n) => 
              (n.id === 0 ? null : <section key={n.id + 's-note'}><Checkbox id={n.id.toString()} className="each-note-checkbox" label={n.kor_name} value={n.id.toString()} /></section>)
            )}
            <Button className="survey-commit-btn" type="submit" waves="light">향수 추천받기</Button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default ConvForm;
