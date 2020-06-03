// @flow
import actionGenerator from 'context/base/withPagination/actions';
import localStore from 'services/storageHelper';

const { getter: getTradeHistory, ...pageMethods } = actionGenerator(
  'tradesHistoryList',
  `/exchange/trades/list/${localStore.getUserId()}`,
  {}
);
export default {
  getTradeHistory,
    ...pageMethods,
};
