import { API_URL } from 'config';
import localStore from './storageHelper';

export const postRequest = async (uri: string, payload: any) => {
  const bearerToken = localStore.getAccessToken();
  const result = await fetch(API_URL + uri, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      ...(payload instanceof FormData
        ? {}
        : { 'Content-Type': 'application/json' }),
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
  });

  return result;
};

export const getRequest = async (uri: string) => {
  const bearerToken = localStore.getAccessToken();
  const result = await fetch(API_URL + uri, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  });

  return result;
};

export const deleteRequest = async (uri: string, payload: any) => {
  const bearerToken = localStore.getAccessToken();
  const result = await fetch(API_URL + uri, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(payload),
  });

  return result;
};

export const putRequest = async (uri, payload) => {
  const bearerToken = localStore.getAccessToken();
  const result = await fetch(API_URL + uri, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(payload),
  });

  return result;
};
