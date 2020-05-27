// @flow
import { generateModule } from 'context/base/withPagination';
import type { Dso } from 'context/dso/types';
import type { Commitment } from './types';

const {
  Provider: DsoListProvider,
  useState: useDsoListState,
  useDispatch: useDsoListDispatch,
  statusList: dsoStatusList,
} = generateModule<Dso>('dsoList');

const {
  Provider: CommitmentsListProvider,
  useState: useCommitmentsListState,
  useDispatch: useCommitmentsListDispatch,
  statusList: commitmentsListStatus,
} = generateModule<Commitment>('commitmentsList');

export default {
  // DSO
  DsoListProvider,
  useDsoListState,
  useDsoListDispatch,
  DSO_LIST_STATUS: dsoStatusList,
  // Commitments
  CommitmentsListProvider,
  useCommitmentsListState,
  useCommitmentsListDispatch,
  COMMITMENTS_LIST_STATUS: commitmentsListStatus,
};
