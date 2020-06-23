// @flow
import { generateStatus } from './types'
import type { BaseStateWithPagination } from './types'

const statusList = generateStatus()

export default function generateInitialState<T> (): BaseStateWithPagination<T> {
  return {
    items: [],
    page: 0,
    limit: 5,
    total: null,
    error: null,
    statusCode: null,
    errorCode: null,
    status: statusList.INIT
  }
}
