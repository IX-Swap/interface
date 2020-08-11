//
import { generateModule } from 'context/base/withPagination'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'authorizerDsoList'
)

export default {
  AuthorizerDsoListProvider: Provider,
  useAuhorizerDsoListState: useState,
  useAuhorizerDsoListDispatch: useDispatch,
  AUTHORIZER_DSO_LIST_STATUS: statusList
}
