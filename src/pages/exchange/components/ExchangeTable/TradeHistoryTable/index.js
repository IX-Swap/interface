import React from 'react';
import Table from './Table';
import TradeHistoryModule from './modules';
import MarketModule from '../../TradingTerminal/modules';

const { MarketProvider } = MarketModule;
const { TradeHistoryListProvider } = TradeHistoryModule;

const TradeHistoryTable = () => {
  return (
      <MarketProvider>
        <TradeHistoryListProvider>
          <Table title='My Trades' />
        </TradeHistoryListProvider>
      </MarketProvider>
    );
};

export default TradeHistoryTable;

