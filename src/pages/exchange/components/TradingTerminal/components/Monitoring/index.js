import React from 'react';
import MonitornigModule from './modules';
import MonitoringComponent from './Monitoring';
const { MonitoringProvider } = MonitornigModule;

const Monitoring = props => {
  return (
    <MonitoringProvider>
        <MonitoringComponent {...props} />
    </MonitoringProvider>
  );
};

export default Monitoring;
