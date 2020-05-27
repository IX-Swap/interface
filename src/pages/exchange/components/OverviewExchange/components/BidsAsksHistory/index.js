import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

// Config/Endpoints
import { ENDPOINT_URL, API_URL } from 'config';
import localStore from 'services/storageHelper';

// Component
import Monitoring from '../Monitoring';

const BidsAsksHistory = () => {
    const bearerToken = localStore.getAccessToken();
    const socket = io(`${API_URL}?token=${bearerToken}`);
    
    const [activeTrade, setActiveTrade] = useState(false);
    const { SUBSCRIBE_API } = ENDPOINT_URL;
    const { ORDER_BOOK } = SUBSCRIBE_API;
    
    // TODO: Dynamic changing of ID
    const _id = '5ecb739f1f3e88614b36ddcb';

    // Subscribe to the bids/asks history
    // TODO: Better way to implement this locally/globally
    useEffect(() => {
        socket.emit(ORDER_BOOK.emit, _id);
        socket.on(`${ORDER_BOOK.on}/${_id}`, data => {
            setActiveTrade(data);
        });
    }, []);
    
    const bids = activeTrade ? activeTrade.bids : [];
    const asks = activeTrade ? activeTrade.asks : [];

    return (
        <React.Fragment>
            <Monitoring data={asks} type="asks" />
            <Monitoring data={bids} type="bids" />
        </React.Fragment>
    );
};

export default BidsAsksHistory;
