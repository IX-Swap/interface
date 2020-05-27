// @flow
import { generateModule } from 'context/base/withPagination';
import type { Dso } from 'context/dso/types';

const {
  Provider: DsoListProvider,
  useState: useDsoListState,
  useDispatch: useDsoListDispatch,
  statusList: dsoStatusList,
} = generateModule<Dso>('dsoList');

export default {
  // DSO
  DsoListProvider,
  useDsoListState,
  useDsoListDispatch,
  DSO_LIST_STATUS: dsoStatusList,
};
