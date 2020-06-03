// @flow
import io from 'socket.io-client';

import { API_URL } from 'config';
import localStore from './storageHelper';

export const subscribeToSocket = () => {
    let socket = io();
    const bearerToken = localStore.getAccessToken();

    // Check if socket is not connected then connect
    if(!socket.connected) {
        socket = io(`${API_URL}?token=${bearerToken}`);
    }

  return socket;
};
