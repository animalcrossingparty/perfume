import axios from 'axios';

const BASE_URL = 'http://i02b208.p.ssafy.io:8000'

export const checkEmailExists = (email) => axios.get(`${BASE_URL}/accounts/exists/email/` + email + '/');
export const checkUsernameExists = (username) => axios.get('/exists/username/' + username);

export const localRegister = ({email, username, password}) => axios.post(`${BASE_URL}/accounts/signup/`, { email, username, password });
export const localLogin = ({email, password}) => axios.post(`${BASE_URL}/accounts/login/`, { email, password });

export const checkStatus = () => axios.get('/check');
export const logout = () => 0;

// perfume
export const getPerfumes = (page:number) => axios.get(`${BASE_URL}/perfumes?page=${page}&`);
export const getPerfumeDetail = (id:number) => axios.get(`api/perfumes?pk=${id}`)