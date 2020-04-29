import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map } from 'immutable';
import * as API from 'lib/api';

// 액션 타입 정의

const GET_PERFUME_INFO = 'GET_PERFUME_INFO' // 향수 정보 가져오기
const GET_RANDOM_INFO = 'GET_RANDOM_INFO'
const SET_CATEGORY_SELECT = 'SET_CATEGORY_SELECT'
// 액션 프로바이더 정의

export const getPerfumeInfo = createAction(GET_PERFUME_INFO, API.getPerfumes)
export const getRandInfo = createAction(GET_RANDOM_INFO, API.getRand)
export const setCartSelect = createAction(SET_CATEGORY_SELECT)

const initialState = Map({
  perfumesList: [],
  num_pages: 0,
  randList: [],
  category: [
    { id: '1', label: "시트러스", value: '1', checked: false },
    { id: '2', label: "프루티", value: '2', checked: false },
    { id: '3', label: "플로럴", value: '3', checked: false },
    { id: '4', label: "White플로럴", value: '4', checked: false },
    { id: '5', label: "그린, 허브", value: '5', checked: false },
    { id: '6', label: "스파이시", value: '6', checked: false },
    { id: '7', label: "스위츠", value: '7', checked: false },
    { id: '8', label: "우디", value: '8', checked: false },
    { id: '9', label: "발삼", value: '9', checked: false },
    { id: '10', label: "머스크", value: '10', checked: false },
    { id: '11', label: "음료", value: '11', checked: false },
    { id: '12', label: "알데하이드", value: '12', checked: false },
  ],
});

export default handleActions({
  ...pender({
    type: GET_PERFUME_INFO,
    onSuccess: (state = initialState, action) => {
      return state.set('perfumesList', action.payload.data).set('num_pages', parseInt(action.payload.headers.num_pages))
    }
  }),
  ...pender({
    type: GET_RANDOM_INFO,
    onSuccess: (state = initialState, action) => {
      return state.set('randList', action.payload.data)
    }
  }),
}, initialState);