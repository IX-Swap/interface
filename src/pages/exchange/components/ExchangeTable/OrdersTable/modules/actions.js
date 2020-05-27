// @flow
import actionGenerator from 'context/base/withPagination/actions';

const { getter: getOrdersList, ...pageMethods } = actionGenerator(
  'ordersList',
  `/exchange/orders`,
  {}
);

export default {
  getOrdersList,
    ...pageMethods,
};
