import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';
import { Map } from 'immutable';

const CHANGE_INPUT = 'auth/CHANGE_INPUT'; // input 값 변경
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화
const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS'; // 이메일 중복 확인
const CHECK_USERNAME_EXISTS = 'auth/CHECK_USERNAME_EXISTS'; // 아이디 중복 확인
const SET_ERROR = 'auth/SET_ERROR'; // 오류 설정

export const changeInput = createAction(CHANGE_INPUT); //  { form, name, value }
export const initializeForm = createAction(INITIALIZE_FORM); // form 
export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists); // email
export const checkUsernameExists = createAction(CHECK_USERNAME_EXISTS, AuthAPI.checkUsernameExists); // username
export const setError = createAction(SET_ERROR); // { form, message }

const initialState = Map({
    register: Map({
        form: Map({
            email: '',
            username: '',
            password: '',
            passwordConfirm: ''
        }),
        exists: Map({
            email: false,
            password: false
        }),
        error: null
    }),
    login: Map({
        form: Map({
            email: '',
            password: ''
        }),
        error: null
    }),
    result: Map({})
});


export default handleActions({
    [CHANGE_INPUT]: (state:Map<any, any>, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name], value);
    },
    ...pender({
        type: CHECK_EMAIL_EXISTS,
        onSuccess: (state:Map<any, any>, action) => state.setIn(['register', 'exists', 'email'], action.payload.data.exists)
    }),
    [INITIALIZE_FORM]: (state:Map<any, any>, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },
    ...pender({
        type: CHECK_USERNAME_EXISTS,
        onSuccess: (state:Map<any, any>, action) => state.setIn(['register', 'exists', 'username'], action.payload.data.exists)
    }),
    [SET_ERROR]: (state:Map<any, any>, action) => {
        const { form, message } = action.payload;
        return state.setIn([form, 'error'], message);
    }
}, initialState);