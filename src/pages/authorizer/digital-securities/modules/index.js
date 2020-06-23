// @flow
import { generateModule } from 'context/base/withPagination'
import type { Dso } from 'context/dso/types'

const { Provider, useState, useDispatch, statusList } = generateModule<Dso>(
  'authorizerDsoList'
)

export default {
  AuthorizerDsoListProvider: Provider,
  useAuhorizerDsoListState: useState,
  useAuhorizerDsoListDispatch: useDispatch,
  AUTHORIZER_DSO_LIST_STATUS: statusList
}
