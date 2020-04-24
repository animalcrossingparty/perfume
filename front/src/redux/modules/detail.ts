import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import * as API from "lib/api";
import { Map } from "immutable";

const GET_DETAIL = "detail/GET_DETAIL";

export const getPerfumeDetail = createAction(GET_DETAIL, API.getPerfumeDetail);

const initialState = Map({
  detail: {
    id: 26148987,
    avg_rate: 10,
    top_notes: [
      { id: 247, name: "coffee", kor_name: "커피" },
      { id: 367, name: "gardenia", kor_name: "가디니아" },
      { id: 444, name: "hyacinth", kor_name: "히아신스" },
      { id: 527, name: "lily", kor_name: "릴리" },
      { id: 664, name: "orchid", kor_name: "오키드" },
      { id: 785, name: "rose", kor_name: "로즈" },
      { id: 913, name: "tuberose", kor_name: "터브로즈" },
    ],
    heart_notes: [],
    base_notes: [],
    total_review: 1,
    brand: { id: 1, name: "& Other Stories" },
    name: " 04째N 74째W - Columbia",
    launch_date: "2014-01-01",
    thumbnail: "http://www.basenotes.net/photos/products/300/26148987-3407.jpg",
    gender: 0,
    availability: true,
    categories: [],
    seasons: [],
  },
});

export default handleActions(
  {
    ...pender({
      type: GET_DETAIL,
      onSuccess: (state = initialState, action) => {
        return state.set("detail", action.payload.data);
      },
    }),
  },
  initialState
);
