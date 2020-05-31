import React from 'react';
import PostOrderModule from './modules';
import MonitoringModule from '../Monitoring/modules';
import BidsAsksComponent from './BidsAsks';
const { PostOrderProvider } = PostOrderModule;
const { MonitoringProvider } = MonitoringModule;

const BidsAsks = props => {
  return (
    <PostOrderProvider>
      <MonitoringProvider>
        <BidsAsksComponent {...props} />
      </MonitoringProvider>
    </PostOrderProvider>
  );
};

export default BidsAsks;
