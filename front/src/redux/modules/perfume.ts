import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map } from 'immutable';
import * as API from 'lib/api';

// 액션 타입 정의

const GET_PERFUME_INFO = 'GET_PERFUME_INFO' // 향수 정보 가져오기

// 액션 프로바이더 정의

export const getPerfumeInfo = createAction(GET_PERFUME_INFO, API.getPerfumes)

const initialState = Map({
  perfumesList: [],
  num_pages: 0
});

export default handleActions({
  ...pender({
    type: GET_PERFUME_INFO,
    onSuccess: (state = initialState, action) => {
      return state.set('perfumesList', action.payload.data).set('num_pages', parseInt(action.payload.headers.num_pages))
    }
  }),
}, initialState);