import React, { Component } from "react";
import { connect } from "react-redux";
import {ConvForm} from "components"
import springPIC from 'assets/images/spring.jpg'; 
import summerPIC from 'assets/images/summer.jpg'; 
import autumnPIC from 'assets/images/autumn.jpg'; 
import winterPIC from 'assets/images/winter.jpg'; 

class Survey extends Component<{}> {
  componentDidMount() {
    // 대충 향수를 불러 오겠다는 곳
  }

  render() {
    return (
        <ConvForm formFields={[
          {
            'tag': 'cf-robot-message',
            'cf-questions': '안녕하세요. 저는 로르 리시입니다.'
          },
          {
            'tag': 'cf-robot-message',
            'cf-questions': '향수를 추천해드리기 전에 몇가지 질문을 드리고 싶어요!'
          },
          {
            'tag': 'select',
            'name': 'gender',
            'cf-questions': '어떤 분을 위한 향수인가요?',
            "isMultiChoice": false, 
            "children": [
              {
                'tag': 'option',
                'cf-label': '남자 향수를 찾고 있어.',
                'value': 0
              },
              {
                'tag': 'option',
                'cf-label': '여성 향수를 알고 싶어.',
                'value': 1
              },
              {
                'tag': 'option',
                'cf-label': '성별에 관계없이 쓸 수 있는걸 원해.',
                'value': 2
              }
            ]
          },
          {
            'tag': 'cf-robot-message',
            'name': 'if-male',
            'cf-conditional-gender': 0,
            'cf-questions': '남성용 향수를 찾으시는군요!'
          },
          {
            'tag': 'cf-robot-message',
            'name': 'if-female',
            'cf-conditional-gender': 1,
            'cf-questions': '여성용 향수를 찾으신다구요?'
          },
          {
            'tag': 'cf-robot-message',
            'name': 'if-unisex',
            'cf-conditional-gender': 2,
            'cf-questions': '성별에 관계없는 향수를 찾으시나봐요!'
          },
          {
            'tag': 'cf-robot-message',
            'cf-questions': '조금 조심스러운 질문이지만,'
          },
          {
            'tag': 'input',
            'type': 'number',
            'name': 'age',
            'min': 10,
            'max': 99,
            'cf-questions': '혹시 나이가 어떻게 되시나요?',
            'cf-error': '나이를 정확히 입력해주세요 ㅠㅡㅠ',
            'cf-input-placeholder': '나이를 숫자로 입력해주세요. (10 ~ 99)'
          },
          {
            'tag': 'cf-robot-message',
            'cf-questions': '{previous-answer} 살이라구요? 그렇게 안 보이시는데...'
          },
          {
            "tag": "fieldset",
            "type": "Checkboxes",
            'cf-input-placeholder': '좋아하는 계절을 선택해주세요.',
            'cf-questions': '향수를 사용하실 계절을 모두 선택해주세요!',
            'children': [
              {
                'tag':'input',
                'type': 'checkbox',
                'name': 'seasons',
                'cf-label': '봄',
                'value': 1,
                'cf-image': springPIC
              },
              {
                'tag': 'input',
                'type': 'checkbox',
                'name': 'seasons',
                'cf-label': '여름',
                'value': 2,
                'cf-image': summerPIC
              },
              {
                'tag': 'input',
                'type': 'checkbox',
                'name': 'seasons',
                'cf-label': '가을',
                'value': 3,
                'cf-image': autumnPIC
              },
              {
                'tag': 'input',
                'type': 'checkbox',
                'name': 'seasons',
                'cf-label': '겨울',
                'value': 4,
                'cf-image': winterPIC
              }
            ]
          },
          {
            'tag': 'cf-robot-message',
            'cf-questions': '그렇군요... 다음은 가장 중요한 질문이에요!'
          },
          {
            'tag': 'select',
            'name': 'include',
            'cf-questions': '좋아하는 카테고리를 3 개 골라주세요!',
            'cf-validation': 'isIncludeValid',
            'multiple': true,
            'children': [
              {
                'tag': 'option',
                'cf-label': '시트러스',
                'value': 1
              },
              {
                'tag': 'option',
                'cf-label': '과일 및 견과류 향',
                'value': 2
              },
              {
                'tag': 'option',
                'cf-label': '일반 꽃 계열',
                'value': 3
              },
              {
                'tag': 'option',
                'cf-label': '흰 꽃 계열',
                'value': 4
              },
              {
                'tag': 'option',
                'cf-label': '허브와 푸제르 향',
                'value': 5
              },
              {
                'tag': 'option',
                'cf-label': '향신료',
                'value': 6
              },
              {
                'tag': 'option',
                'cf-label': '스위트, 구르망',
                'value': 7
              },
              {
                'tag': 'option',
                'cf-label': '나무, 이끼 향',
                'value': 8
              },
              {
                'tag': 'option',
                'cf-label': '건포도, 식초 향',
                'value': 9
              },
              {
                'tag': 'option',
                'cf-value': '머스크, 앰버, 동물 향',
                'value': 10
              },
              {
                'tag': 'option',
                'cf-value': '술, 음료',
                'value': 11
              },
              {
                'tag': 'option',
                'cf-value': '합성물질',
                'value': 12
              }
            ]
          }


        ]} />
    );
  }
}

export default connect(
  (state) => ({
    // 뭔가 스토어에 불러오면 기분이 좋지 않을까?
  }),
  (dispatch) => ({
    // 대충 향수를 디스패치 하겠다는 곳
  })
)(Survey);
