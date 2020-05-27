// @flow
import actionGenerator from 'context/base/withPagination/actions';

// Dso List
const { getter: getDsoList, ...dsoListPageMethods } = actionGenerator(
  'dsoList',
  `/issuance/dso/list`,
  {}
);

export default {
  getDsoList,
  ...dsoListPageMethods,
};
