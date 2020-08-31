//
import { generateModule } from 'v1/context/base/withPagination'
import actionGenerator from 'v1/context/base/withPagination/actions'

function init (key, endpoint) {
  const { Provider, useState, useDispatch, statusList } = generateModule(key)

  const actions = actionGenerator(key, endpoint, {})

  return {
    meta: { Provider, useState, useDispatch, PAGINATION_STATUS: statusList },
    actions
  }
}

export default init
