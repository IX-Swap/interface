//
import { generateModule } from 'v1/context/base/withPagination'

const {
  Provider: CommitmentsListProvider,
  useState: useCommitmentsListState,
  useDispatch: useCommitmentsListDispatch,
  statusList: commitmentsListStatus
} = generateModule('commitmentsList')

export default {
  CommitmentsListProvider,
  useCommitmentsListState,
  useCommitmentsListDispatch,
  COMMITMENTS_LIST_STATUS: commitmentsListStatus
}
