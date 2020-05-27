// @flow
import { generateModule } from 'context/base/withPagination';
import type { Commitment } from './types';

const {
  Provider: CommitmentsListProvider,
  useState: useCommitmentsListState,
  useDispatch: useCommitmentsListDispatch,
  statusList: commitmentsListStatus,
} = generateModule<Commitment>('commitmentsList');

export default {
  CommitmentsListProvider,
  useCommitmentsListState,
  useCommitmentsListDispatch,
  COMMITMENTS_LIST_STATUS: commitmentsListStatus,
};
