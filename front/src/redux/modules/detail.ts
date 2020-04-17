import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as API from 'lib/api';
import { Map } from 'immutable';

const GET_DETAIL = 'detail/GET_DETAIL';

export const getPerfumeDetail = createAction(GET_DETAIL, API.getPerfumeDetail); 

const initialState = Map({
  detail: Object({
    perfume: Map({
      pk: 0,
      model: 'perfumes.perfume'
    }),
    fields: Map({
      name: '이름 모를 향수',
      launch_date: "1949-01-01",
      thumbnail: "http://www.basenotes.net/images/design2013/bigs.png",
      gender: 0,
      availibility: 0,
      brand_id: 749,
      top_notes: [
        480,
        224
      ],
      heart_notes: [
        259,
        510,
        785,
        224
      ],
      base_notes: [
        28,
        624
      ]
    }),
  })
});


export default handleActions({
  ...pender({
    type: GET_DETAIL,
    onSuccess: (state = initialState, action) => {
      return state.set("detail", action.payload.data)
    }
  }),
}, initialState);