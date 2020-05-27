// @flow
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Paper, Tabs, Tab, Box, Divider } from '@material-ui/core';
import DsoList from 'components/Dso/DsoList';
import type { Dso } from 'context/dso/types';
import { useInvestDispatch } from '../../modules';
import { setSelectedDso } from '../../modules/actions';
import CommitmentsList from './CommitmentsList';
import CommitmentsListModule from './modules';

const { CommitmentsListProvider } = CommitmentsListModule;

const DsoBoard = () => {
  const investDispatch = useInvestDispatch();
  const [tab, setTab] = useState(0);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const onClickView = (dso: Dso) => {
    setSelectedDso(investDispatch, dso);

    history.push(`/invest/view`);
  };

  return (
    <CommitmentsListProvider>
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
            <Box py={4}>
              {tab === 0 ? (
                <DsoList onClickView={onClickView} />
              ) : (
                <CommitmentsList />
              )}
            </Box>
          </Container>
        </Paper>
      </Container>
    </CommitmentsListProvider>
  );
};

export default DsoBoard;
