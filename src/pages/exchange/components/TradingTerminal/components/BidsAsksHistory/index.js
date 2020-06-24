import React, { useState, useEffect } from 'react'
// Config/Endpoints
import { ENDPOINT_URL } from 'config'
import { subscribeToSocket } from 'services/socket'

// Component
import Monitoring from '../Monitoring'

// Market State/Modules
import MarketModules from '../../modules'

const { MarketState } = MarketModules

const BidsAsksHistory = (props) => {
  const { id } = props
  const marketStateData = MarketState()
  const { items } = marketStateData

  const [lastPrice, setLastPrice] = useState(0)
  const [isBid, setIsBid] = useState(false)
  const [lastTrade, setLastTrade] = useState({})
  const [activeTrade, setActiveTrade] = useState(false)
  const { SUBSCRIBE_API } = ENDPOINT_URL
  const { LAST_PRICE } = SUBSCRIBE_API
  const { ORDER_BOOK } = SUBSCRIBE_API
  const { TRADE_HISTORY } = SUBSCRIBE_API
  // Subscribe to the bids/asks history
  // TODO: Better way to implement this locally/globally
  // Update after MAS
  /*eslint-disable */
    useEffect(() => {
        const socket = subscribeToSocket();
        socket.emit(ORDER_BOOK.emit, id);
        socket.on(`${ORDER_BOOK.on}/${id}`, data => {
            setActiveTrade(data);
        });

        socket.emit(LAST_PRICE.emit, id)
        socket.on(`${LAST_PRICE.on}/${id}`, data => {
            setLastPrice(data);
        });
    }, [id]);

    useEffect(() => {
        const socket = subscribeToSocket();
        socket.emit(TRADE_HISTORY.emit, id);
        socket.on(`${TRADE_HISTORY.on}/${id}`, data => {
            setLastTrade(data.length ? data[0]: {});
        });

        return () => {
            socket.off(`${TRADE_HISTORY.on}/${id}`);
        };
    }, [id]);

    useEffect(() => {
        setIsBid(lastPrice === lastTrade.price && lastTrade.side === "BID");
    }, [lastPrice, lastTrade]);
    /*eslint-disable */
    const tradingItem = items.length && items.find(item => item._id === id);
    const bids = activeTrade ? activeTrade.bids : [];
    const asks = activeTrade ? activeTrade.asks : [];

    const quoteData = tradingItem.quote;
    const listingData = tradingItem.listing;

    return (
        <React.Fragment>
            <Monitoring
                quoteData={quoteData}
                listingData={listingData}
                data={asks}
                type="asks"
            />
            <Monitoring
                quoteData={quoteData}
                listingData={listingData}
                data={bids}
                lastPrice={lastPrice}
                isBid={isBid}
                type="bids"
            />
        </React.Fragment>
    );
};

export default BidsAsksHistory;
