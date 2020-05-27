// @flow
import actionGenerator from 'context/base/withPagination/actions';
import localStore from 'services/storageHelper';

// Dso List
const { getter: getDsoList, ...dsoListPageMethods } = actionGenerator(
  'dsoList',
  `/issuance/dso/list`,
  {}
);

// Commitments List
const {
  getter: getCommitmentsList,
  ...commitmentsListPageMethods
} = actionGenerator(
  'commitmentsList',
  `/issuance/commitments/list/${localStore.getUserId()}`,
  {}
);

export default {
  dsoList: {
    getDsoList,
    ...dsoListPageMethods,
  },
  commitmentsList: {
    getCommitmentsList,
    ...commitmentsListPageMethods,
  },
};
