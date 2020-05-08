import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as API from 'lib/api';
import { Map } from 'immutable';

const CHANGE_INPUT = 'review/CHANGE_INPUT'; // input 값 변경
const POST_REVIEW = 'POST_REVIEW'; // 이메일 가입

export const changeInput = createAction(CHANGE_INPUT)
export const postReview = createAction(POST_REVIEW, API.postReview); 

const initialState = Map({
  form: Map({
    content: '',
    rate: 0,
  }),
  review_id: 0

});


export default handleActions({
    [CHANGE_INPUT]: (state = initialState, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, name], value);
    },
    ...pender({
        type: POST_REVIEW,
        onSuccess: (state = initialState, action) => state.setIn(['form', 'review_id'], action.payload.review_id)
    }),
}, initialState);