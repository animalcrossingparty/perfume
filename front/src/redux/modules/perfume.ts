import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import { Map } from "immutable";
import * as API from "lib/api";

// 액션 타입 정의

const GET_PERFUME_INFO = "GET_PERFUME_INFO"; // 향수 정보 가져오기
const GET_RANDOM_INFO = "GET_RANDOM_INFO";
const SET_CATEGORY_SELECT = "SET_CATEGORY_SELECT";
// const GET_SEARCH_INFO = "GET_SEARCH_INFO"
// 액션 프로바이더 정의

export const getPerfumeInfo = createAction(GET_PERFUME_INFO, API.getPerfumes);
export const getRandInfo = createAction(GET_RANDOM_INFO, API.getRand);
export const setCartSelect = createAction(SET_CATEGORY_SELECT);
export const searchInfo = createAction(GET_PERFUME_INFO, API.getSearch)

const initialState = Map({
  perfumesList: [],
  num_pages: 0,
  randList: [],
  category: [
    { id: "1", label: "시트러스", value: "1", checked: false },
    { id: "2", label: "프루티", value: "2", checked: false },
    { id: "3", label: "플로럴", value: "3", checked: false },
    { id: "4", label: "W플로럴", value: "4", checked: false },
    { id: "5", label: "그린, 허브", value: "5", checked: false },
    { id: "6", label: "스파이시", value: "6", checked: false },
    { id: "7", label: "스위츠", value: "7", checked: false },
    { id: "8", label: "우디", value: "8", checked: false },
    { id: "9", label: "발삼", value: "9", checked: false },
    { id: "10", label: "머스크", value: "10", checked: false },
    { id: "11", label: "음료", value: "11", checked: false },
    { id: "12", label: "알데하이드", value: "12", checked: false },
  ],
  fbrand: [
    { id: 16, name: "4711" },
    { id: 40, name: "애버크롬비 & 피치" },
    { id: 215, name: "안나수이" },
    { id: 260, name: "아리아나 그란데" },
    { id: 293, name: "아틀리에 코롱" },
    { id: 390, name: "베네피트" },
    { id: 391, name: "베네통" },
    { id: 527, name: "불가리" },
    { id: 528, name: "버버리" },
    { id: 532, name: "킬리안" },
    { id: 555, name: "캘빈 클라인" },
    { id: 614, name: "샤넬" },
    { id: 647, name: "끌로에" },
    { id: 648, name: "쇼파드" },
    { id: 653, name: "크리스찬 디올" },
    { id: 678, name: "클린" },
    { id: 687, name: "코치" },
    { id: 749, name: "크리드" },
    { id: 855, name: "딥디크" },
    { id: 864, name: "돌채 앤 가바나" },
    { id: 936, name: "엘리자베스 아덴" },
    { id: 1122, name: "프레쉬" },
    { id: 1191, name: "조르지오 아르마니" },
    { id: 1200, name: "지방시" },
    { id: 1238, name: "구찌" },
    { id: 1240, name: "겔랑" },
    { id: 1241, name: "게스" },
    { id: 1315, name: "에르메스" },
    { id: 1418, name: "이세이 미야케" },
    { id: 1504, name: "제니퍼 로페즈" },
    { id: 1517, name: "지미추" },
    { id: 1525, name: "조 말론 런던" },
    { id: 1543, name: "존 바바토스" },
    { id: 1624, name: "겐조" },
    { id: 1708, name: "라코스테" },
    { id: 1713, name: "람보르기니" },
    { id: 1724, name: "랑방" },
    { id: 1733, name: "로라 메르시에" },
    { id: 1816, name: "롤리타 렘피카" },
    { id: 1934, name: "마크 제이콥스" },
    { id: 2023, name: "메르세데스 벤츠" },
    { id: 2036, name: "마이클 코스" },
    { id: 2097, name: "모노템" },
    { id: 2104, name: "몽블랑" },
    { id: 2153, name: "나르시소 로드리게즈" },
    { id: 2326, name: "파코 라반" },
    { id: 2446, name: "필로소피" },
    { id: 2495, name: "프라다" },
    { id: 2626, name: "로샤스" },
    { id: 2706, name: "살바토레 페라가모" },
    { id: 3032, name: "톰 포드" },
    { id: 3046, name: "토스" },
    { id: 3130, name: "베르사체" },
    { id: 3140, name: "빅토리아 시크릿" },
    { id: 3227, name: "입생로랑" },
  ],

});

export default handleActions(
  {
    [SET_CATEGORY_SELECT]: (state = initialState, action) => {
      return state.set("category", action.payload);
    },
    ...pender({
      type: GET_PERFUME_INFO,
      onSuccess: (state = initialState, action) => {
        return state
          .set("perfumesList", action.payload.data)
          .set("num_pages", parseInt(action.payload.headers.num_pages));
      },
    }),
    ...pender({
      type: GET_RANDOM_INFO,
      onSuccess: (state = initialState, action) => {
        return state.set("randList", action.payload.data);
      },
    }),
  },
  initialState
);
