import React from 'react';
import MarketModule from '../../OverviewExchange/modules';
import TableMarketListings from './TableMarketListings';
const { MarketProvider } = MarketModule;

const Overview = () => {
  return (
    <MarketProvider>
        <TableMarketListings title='Markets' />
    </MarketProvider>
  );
};

export default Overview;
