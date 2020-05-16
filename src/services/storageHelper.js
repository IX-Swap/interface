// @flow
import type { User } from 'context/user/types';

const set = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const get = () => {
  const storedCredentials = localStorage.getItem('user');
  return storedCredentials ? JSON.parse(storedCredentials) : {};
};

const remove = () => localStorage.removeItem('user');

const getAccessToken = () => get().accessToken;

const getUserId = () => get()._id;

export default {
  set,
  get,
  remove,
  getAccessToken,
  getUserId,
};
