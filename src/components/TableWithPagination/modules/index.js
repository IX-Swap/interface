// @flow
import { generateModule } from 'context/base/withPagination'
import actionGenerator from 'context/base/withPagination/actions'
import type {
  BaseStateWithPagination,
  GenericStatus
} from 'context/base/withPagination/types'

export type ModuleMeta = {
  Provider: any,
  useState: () => BaseStateWithPagination<any>,
  useDispatch: () => any,
  PAGINATION_STATUS: GenericStatus,
};

export type ModuleActions = {
  getter: (...a: any) => any,
  setPage: (...a: any) => any,
  clearBaseData: (...a: any) => any,
  clearApiStatus: (...a: any) => any,
  setRowsPerPage: (...a: any) => any,
};

export type Module = {
  meta: ModuleMeta,
  actions: ModuleActions,
};

function init<T> (key: string, endpoint: string): Module {
  const { Provider, useState, useDispatch, statusList } = generateModule<T>(
    key
  )

  const actions = actionGenerator(key, endpoint, {})

  return {
    meta: { Provider, useState, useDispatch, PAGINATION_STATUS: statusList },
    actions
  }
}

export default init
