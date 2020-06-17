// @flow
import io from 'socket.io-client';

import { API_URL } from 'config';
import localStore from './storageHelper';

let socket;

export const _subscribeToSocket = (): Promise<any> =>
  new Promise((resolve) => {
    const bearerToken = localStore.getAccessToken();
    if (!bearerToken) {
      resolve(undefined);
      return;
    }

    // Check if socket is not connected then connect
    if (!socket || !socket.connected) {
      console.log('will subscribe', socket);
      socket = io(`${API_URL}?token=${bearerToken}`);
      socket.on('connect', () => {
        console.log('connect');
        resolve(socket);
      });
      socket.on('connect_error', function (...props) {
        console.log('no connect', props);
        resolve(socket);
      });
      socket.on('connect_timeout', function () {
        console.log('no timeout');
        resolve(socket);
      });
      socket.on('error', function (...props) {
        console.log('no connect', props);
        resolve(socket);
      });
      socket.on('reconnecting', function () {
        console.log('reconnecting connect');
        resolve(socket);
      });
    } else {
      console.log('else');
      return resolve(socket);
    }
  });

export const subscribeToSocket = () => {
  if (socket && !socket.connected) {
    const bearerToken = localStore.getAccessToken();
    socket = io(`${API_URL}?token=${bearerToken}`);
  }

  return socket;
};
