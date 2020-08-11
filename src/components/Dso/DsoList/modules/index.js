//
import { generateModule } from 'context/base/withPagination'

const {
  Provider: DsoListProvider,
  useState: useDsoListState,
  useDispatch: useDsoListDispatch,
  statusList: dsoStatusList
} = generateModule('dsoList')

export default {
  // DSO
  DsoListProvider,
  useDsoListState,
  useDsoListDispatch,
  DSO_LIST_STATUS: dsoStatusList
}
