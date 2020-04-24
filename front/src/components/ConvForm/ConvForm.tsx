import React, { Component, createRef } from "react";
import { ConversationalForm } from "conversational-form";

interface ConvFormProps {
  formFields: any;
  
}

class ConvForm extends Component<ConvFormProps> {
  private convRef = createRef<HTMLDivElement>()
  flowCallback = (dto, success, error) => {
    if (dto.tag.name === 'include') {
      if (dto.tag.value.length === 3){
        console.log(success())
      } else {
        return error()
      }
    }
    return success();
  }

  componentDidMount() {
    const node = this.convRef.current
    const cf = ConversationalForm.startTheConversation({
      options: {
        submitCallback: this.submitCallback,
        flowStepCallback: this.flowCallback,
        hideUserInputOnNoneTextInput: false,
        preventAutoFocus: true,
        loadExternalStyleSheet: true,
        context: node,
        dictionaryData: {
          "input-placeholder": "여기에 답변을 입력해주세요.",
        }
      },
      tags: this.props.formFields,
    });
    if (node) {
      node.appendChild(cf.el);
    }
  }
  
  submitCallback(e) {
    console.log(e.getFormData(true))
  }

  render() {

    return (
        <div ref={this.convRef} />
    );
  }
}

export default ConvForm;
