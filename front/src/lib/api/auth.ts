import axios from 'axios';

export const checkEmailExists = (email) => axios.get('/exists/email/' + email);
export const checkUsernameExists = (username) => axios.get('/exists/username/' + username);

export const localRegister = ({email, username, password}) => axios.post('/signup', { email, username, password });
export const localLogin = ({email, password}) => axios.post('/login', { email, password });

export const checkStatus = () => axios.get('/check');
export const logout = () => axios.post('/logout');