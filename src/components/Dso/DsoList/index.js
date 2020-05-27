// @flow
import React from 'react';
import DsoListModule from '../modules';
import DsoList from './DsoList';

const { DsoListProvider } = DsoListModule;

const DsoListWithProvider = ({ onClickView }: { onClickView: Function }) => (
  <DsoListProvider>
    <DsoList onClickView={onClickView} />
  </DsoListProvider>
);

export default DsoListWithProvider;
