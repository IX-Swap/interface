import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Config/Endpoints
import { ENDPOINT_URL, API_URL } from 'config';
import localStore from 'services/storageHelper';

// Component
import Monitoring from '../Monitoring';

const TradeHistory = (props) => {
    const { id } = props;
    const bearerToken = localStore.getAccessToken();
    const socket = io(`${API_URL}?token=${bearerToken}`);
    
    const [tradeStory, setTradeStory] = useState(false);
    const { SUBSCRIBE_API } = ENDPOINT_URL;
    const { TRADE_HISTORY } = SUBSCRIBE_API;

    // Update after demo
    /*eslint-disable */
    useEffect(() => {
        socket.emit(TRADE_HISTORY.emit, id);
        socket.on(`${TRADE_HISTORY.on}/${id}`, data => {
            setTradeStory(data);
        });
    }, []);
    /*eslint-disable */
    
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
