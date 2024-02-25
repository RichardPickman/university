'use client';

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
    const response = await axiosRequest(authConfig.loginEndpoint, 'post', data);

    set({ user: { ...data, role: 'client' } })

    if (data.rememberMe) {
      window.localStorage.setItem('userData', JSON.stringify(data))
      window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
      window.localStorage.setItem('refreshToken', response.data.refreshToken)
    }
  },
  register: async (data) => {
    return await axiosRequest(authConfig.registerEndpoint, 'post', data)
  },
  logout: () => {
    set(() => ({ user: null }))

    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
  },
  forgotMyPassword: async (data) => {
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName);

    await axiosRequest(authConfig.forgotMyPasswordEndpoint, 'post', { ...data, token });
  },
}));

export const useUserStore = () => userStore

prefetchSavedUser()
  .then(user => {
    console.log({ user, loading: false }, 'TRUE');

    userStore.setState(() => ({ user, loading: false }))
  })