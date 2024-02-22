'use client';

import axios from 'axios';
import authConfig from 'src/configs/auth';
import { create } from 'zustand';

export const useUserStore = () => create((set) => ({
  user: null,
  loading: false,
  setUser: (data) => set((state) => ({ ...state, user: data })),
  login: (data) => new Promise((resolve, reject) => {
    axios
      .post(authConfig.loginEndpoint, data)
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
    axios
      .post(authConfig.registerEndpoint, data)
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

    axios
      .post(authConfig.forgotMyPasswordEndpoint, { ...data, token })
      .then(resolve)
      .catch(reject)
  })
}));

