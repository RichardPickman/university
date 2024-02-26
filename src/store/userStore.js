import axiosRequest from 'src/axios/axiosRequestWithoutBearer';
import { getAccessToken } from 'src/axios/getAccessToken';
import authConfig from 'src/configs/auth';
import { create } from 'zustand';

const prefetchSavedUser = async () => {
  try {
    const { refreshToken } = getAccessToken();

    const newResponse = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/rotateJwtTokens',
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    )

    if (!newResponse.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseData = await newResponse.json()

    const newAccessToken = responseData.accessToken
    const newRefreshToken = responseData.refreshToken

    window.localStorage.setItem(authConfig.storageTokenKeyName, newAccessToken);
    window.localStorage.setItem('refreshToken', newRefreshToken);

    const user = window.localStorage.getItem('userData');

    return JSON.parse(user)
  } catch (err) {
    return null
  }
}

const userStore = create((set) => ({
  user: null,
  loading: false,
  setUser: (data) => set(() => ({ user: data })),
  login: async (data) => {
    set({ loading: true });

    const response = await axiosRequest(authConfig.loginEndpoint, 'post', data);

    set({ user: { ...data, role: 'client' } })

    if (data.rememberMe) {
      window.localStorage.setItem('userData', JSON.stringify(data))
      window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
      window.localStorage.setItem('refreshToken', response.data.refreshToken)
    }

    set({ loading: false });
  },
  register: async (data) => {
    set({ loading: true });

    await axiosRequest(authConfig.registerEndpoint, 'post', data)

    set({ loading: false });
  },
  logout: () => {
    set(() => ({ user: null }))

    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    window.localStorage.removeItem('refreshToken')
  },
  forgotMyPassword: async (data) => {
    set({ loading: true });

    const token = window.localStorage.getItem(authConfig.storageTokenKeyName);

    await axiosRequest(authConfig.forgotMyPasswordEndpoint, 'post', { ...data, token });

    set({ loading: false });
  },
}));

export const useUserStore = () => userStore

prefetchSavedUser()
  .then(user => {
    userStore.setState(() => ({ user, loading: false }))
  })