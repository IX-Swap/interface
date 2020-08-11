//
import { generateModule } from 'context/base/withPagination'
import actionGenerator from 'context/base/withPagination/actions'

function init (key, endpoint) {
  const { Provider, useState, useDispatch, statusList } = generateModule(key)

  const actions = actionGenerator(key, endpoint, {})

  return {
    meta: { Provider, useState, useDispatch, PAGINATION_STATUS: statusList },
    actions
  }
}

export default init
