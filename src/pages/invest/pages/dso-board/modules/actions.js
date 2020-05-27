// @flow
import actionGenerator from 'context/base/withPagination/actions';
import localStore from 'services/storageHelper';

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
  getCommitmentsList,
  ...commitmentsListPageMethods,
};
