import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

// Config/Endpoints
import { ENDPOINT_URL, API_URL } from 'config';
import localStore from 'services/storageHelper';

// Component
import Monitoring from '../Monitoring';

const TradeHistory = () => {
    const bearerToken = localStore.getAccessToken();
    const socket = io(`${API_URL}?token=${bearerToken}`);
    
    const [tradeStory, setTradeStory] = useState(false);
    const { SUBSCRIBE_API } = ENDPOINT_URL;
    const { TRADE_HISTORY } = SUBSCRIBE_API;
    const _id = '5ecb739f1f3e88614b36ddcb';

    useEffect(() => {
        socket.emit(TRADE_HISTORY.emit, _id);
        socket.on(`${TRADE_HISTORY.on}/${_id}`, data => {
            setTradeStory(data);
        });
    }, []);
    
    const data = tradeStory ? tradeStory : [];

    return (
        <Monitoring 
            title="Trade History"
            type="tradeHistory"
            data={data} 
        />
    );
};

export default TradeHistory;
