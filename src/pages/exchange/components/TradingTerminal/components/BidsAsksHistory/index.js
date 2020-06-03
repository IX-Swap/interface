import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Config/Endpoints
import { ENDPOINT_URL, API_URL } from 'config';
import localStore from 'services/storageHelper';

// Component
import Monitoring from '../Monitoring';

// Market State/Modules
import MarketModules from '../../modules';
const { MarketState } = MarketModules;

const BidsAsksHistory = (props) => {
    const { id } = props;
    const marketStateData = MarketState();
    const { items } = marketStateData;
    const bearerToken = localStore.getAccessToken();
    
    const [activeTrade, setActiveTrade] = useState(false);
    const { SUBSCRIBE_API } = ENDPOINT_URL;
    const { ORDER_BOOK } = SUBSCRIBE_API;
    // Subscribe to the bids/asks history
    // TODO: Better way to implement this locally/globally
    // Update after MAS
    /*eslint-disable */
    useEffect(() => {
        const socket = io(`${API_URL}?token=${bearerToken}`);
        socket.emit(ORDER_BOOK.emit, id);
        socket.on(`${ORDER_BOOK.on}/${id}`, data => {
            setActiveTrade(data);
        });
    }, []);
    /*eslint-disable */
    const tradingItem = items.length && items.find(item => item._id === id);
    const bids = activeTrade ? activeTrade.bids : [];
    const asks = activeTrade ? activeTrade.asks : [];

    const quoteData = tradingItem.quote;
    const listingData = tradingItem.listing;

    return (
        <React.Fragment>
            <Monitoring quoteData={quoteData} listingData={listingData} data={asks} type="asks" />
            <Monitoring quoteData={quoteData} listingData={listingData} data={bids} type="bids" />
        </React.Fragment>
    );
};

export default BidsAsksHistory;
