// @flow
import actionGenerator from 'context/base/withPagination/actions';

const { getter: getDsoList, ...pageMethods } = actionGenerator(
  'dsoList',
  `/issuance/dso/list`,
  {}
);

export default {
  getDsoList,
  ...pageMethods,
};
