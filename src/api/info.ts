import { axiosInstance } from './apiTransport';
import { FetchInfoResponse } from './info.types';

export const fetchInfo = async () => {
  const req = await axiosInstance<FetchInfoResponse>({ url: '/info' });
  return req.data;
};
