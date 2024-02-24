const endpoints = {
  meEndpoint: '/auth/me',
  loginEndpoint: '/auth/login',
  registerEndpoint: '/auth/signUp',
  forgotMyPasswordEndpoint: '/verify/forgotMyPassword',
  storageTokenKeyName: '/accessToken',
  onTokenExpiration: '/refreshToken' // logout | refreshToken
}

export default endpoints;
