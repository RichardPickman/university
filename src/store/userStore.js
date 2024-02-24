'use client';

import axiosRequest from 'src/axios/axiosRequest';
import authConfig from 'src/configs/auth';
import { create } from 'zustand';


export const useUserStore = () => create((set) => ({
  user: null,
  loading: false,
  setUser: (data) => set((state) => ({ ...state, user: data })),
  login: (data) => new Promise((resolve, reject) => {
    axiosRequest(authConfig.loginEndpoint, 'post', data)
      .then(response => {
        set({ user: response.data.userData })

        if (data.rememberMe) {
          window.localStorage.setItem('userData', JSON.stringify(response.data.userData))
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
        }

        resolve();
      })
      .catch(reject)
  }),
  register: (data) => new Promise((resolve, reject) => {
    axiosRequest(authConfig.registerEndpoint, 'post', data)
      .then(resolve)
      .catch(reject)
  }),
  logout: () => {
    set((state) => ({ ...state, user: null }))

    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
  },
  forgotMyPassword: (data) => new Promise((resolve, reject) => {
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName);

    axiosRequest(authConfig.forgotMyPasswordEndpoint, 'post', { ...data, token })
      .then(resolve)
      .catch(reject)
  })
}));

