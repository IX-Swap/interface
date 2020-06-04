// @flow
import React from 'react';
import DsoListModule from './modules';
import DsoList from './DsoList';

const { DsoListProvider } = DsoListModule;

const DsoListWithProvider = ({
  onClickView,
  status,
}: {
  status: string,
  onClickView: Function,
}) => (
  <DsoListProvider>
    <DsoList onClickView={onClickView} status={status} />
  </DsoListProvider>
);

export default DsoListWithProvider;
