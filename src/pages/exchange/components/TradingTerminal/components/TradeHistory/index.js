import React, { useState, useEffect } from 'react'

// Config/Endpoints
import { ENDPOINT_URL } from 'config'

// Component
import { subscribeToSocket } from 'services/socket'
import Monitoring from '../Monitoring'

const TradeHistory = props => {
  const { id } = props

  const [tradeStory, setTradeStory] = useState(false)
  const { SUBSCRIBE_API } = ENDPOINT_URL
  const { TRADE_HISTORY } = SUBSCRIBE_API

  // Update after demo
  /*eslint-disable */
  useEffect(() => {
    const socket = subscribeToSocket();
    socket.emit(TRADE_HISTORY.emit, id);
    socket.on(`${TRADE_HISTORY.on}/${id}`, data => {
      setTradeStory(data);
    });

    return () => {
      socket.off(`${TRADE_HISTORY.on}/${id}`);
    };
  }, [id]);
  /*eslint-disable */

  const data = tradeStory ? tradeStory : [];

  return <Monitoring title="Trade History" type="tradeHistory" data={data} />;
};

export default TradeHistory;
