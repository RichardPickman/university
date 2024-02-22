
const API_URL = 'https://stg-api.accelerate.unic.ac.cy';

const endpoints = {
  meEndpoint: API_URL + '/auth/me',
  loginEndpoint: API_URL + '/auth/login',
  registerEndpoint: API_URL + '/auth/signUp',
  forgotMyPasswordEndpoint: API_URL + '/verify/forgotMyPassword',
  storageTokenKeyName: API_URL + '/accessToken',
  onTokenExpiration: API_URL + '/refreshToken' // logout | refreshToken
}

export default endpoints;
