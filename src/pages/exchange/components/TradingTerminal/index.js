import React from 'react';
import MarketModulee from './modules';
import OverviewExchange from './OverviewExchange';
const { MarketProvider } = MarketModulee;

const Overview = () => {
  return (
    <MarketProvider>
        <OverviewExchange />
    </MarketProvider>
  );
};

export default Overview;
