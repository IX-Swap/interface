//
import actionGenerator from 'v1/context/base/withPagination/actions'
import localStore from 'v1/services/storageHelper'

// Commitments List
const {
  getter: getCommitmentsList,
  ...commitmentsListPageMethods
} = actionGenerator(
  'commitmentsList',
  `/issuance/commitments/list/${localStore.getUserId()}`,
  {}
)

export default {
  getCommitmentsList,
  ...commitmentsListPageMethods
}
