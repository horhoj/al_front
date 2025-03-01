import { axiosInstanceWithCredentials } from './apiTransport';
import { FetchProfileAuthorResponse, FetchProfileDataResponse, FetchProfileQuoteResponse } from './profile.types';

export const fetchProfileData = async () => {
  const res = await axiosInstanceWithCredentials.request<FetchProfileDataResponse>({
    method: 'get',
    url: '/profile/profile-data',
  });
  return res.data;
};

export const fetchProfileAuthor = async () => {
  const res = await axiosInstanceWithCredentials.request<FetchProfileAuthorResponse>({
    method: 'get',
    url: '/profile/profile-author',
  });

  return res.data;
};

export const fetchProfileQuote = async (authorId: string) => {
  const res = await axiosInstanceWithCredentials.request<FetchProfileQuoteResponse>({
    method: 'get',
    url: '/profile/profile-quote',
    params: { authorId },
  });

  return res.data;
};
