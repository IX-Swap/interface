// @flow
import { generateModule } from 'context/base/withPagination';
import type { Dso } from 'context/dso/types';

const { Provider, useState, useDispatch, statusList } = generateModule<Dso>(
  'dsoList'
);

export default {
  DsoListProvider: Provider,
  useDsoListState: useState,
  useDsoListDispatch: useDispatch,
  DSO_LIST_STATUS: statusList,
};
