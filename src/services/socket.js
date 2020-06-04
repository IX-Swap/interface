// @flow
import io from 'socket.io-client';

import { API_URL } from 'config';
import { reject } from 'ramda';
import localStore from './storageHelper';

let socket;

export const _subscribeToSocket = (): Promise<any> =>
  new Promise((resolve, reject) => {
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
        resolve(socket);
      });
    } else {
      return resolve(socket);
    }
  });

export const subscribeToSocket = () => socket;
