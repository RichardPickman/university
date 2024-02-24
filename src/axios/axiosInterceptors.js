import { getAccessToken } from "./getAccessToken"

const axiosBearerInterceptor = async (config) => {
  const { accessToken, refreshToken } = getAccessToken()

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`
    // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  }

  return config
}

export { axiosBearerInterceptor }
