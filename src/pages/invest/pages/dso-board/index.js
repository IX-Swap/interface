import React, { useState } from 'react';
import { Container, Paper, Tabs, Tab, Box, Divider } from '@material-ui/core';
import DsoList from './DsoList';
import DsoListModule from './modules';

const { DsoListProvider } = DsoListModule;

const DsoBoard = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <DsoListProvider>
      <Container>
        <Paper square>
          <Tabs
            variant="fullWidth"
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab value={0} label="Offerings" />
            <Tab value={1} label="My Commitments" />
          </Tabs>
          <Divider />
          <Container>
            <Box py={4}>{tab === 0 ? <DsoList /> : <p>test</p>}</Box>
          </Container>
        </Paper>
      </Container>
    </DsoListProvider>
  );
};

export default DsoBoard;
