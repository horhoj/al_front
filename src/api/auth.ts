import { axiosInstance, axiosInstanceWithCredentials } from './apiTransport';
import { AuthCredentials, AuthResponse } from './auth.types';
import { LS_KEY_API_TOKEN } from './const';

export const signIn = async (credentials: AuthCredentials) => {
  const res = await axiosInstance.request<AuthResponse>({ url: '/auth/sign-in', method: 'post', data: credentials });

  localStorage.setItem(LS_KEY_API_TOKEN, res.data.data.token);
};

export const signOut = async () => {
  await axiosInstanceWithCredentials.request({ url: '/auth/sign-out', method: 'delete' });

  localStorage.removeItem(LS_KEY_API_TOKEN);
};

export const checkToken = async () => {
  await axiosInstanceWithCredentials.request({ url: '/auth/check-token' });
};
