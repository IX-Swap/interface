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

const generateRandom = (length: number, chars: string) => {
  let mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  let result = '';
  for (let i = length; i > 0; i -= 1) {
    result += mask[Math.round(Math.random() * (mask.length - 1))];
  }

  return result;
};

export default {
  set,
  get,
  remove,
  getAccessToken,
  getUserId,
  generateRandom,
};
