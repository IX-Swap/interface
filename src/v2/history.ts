import { createHashHistory, createMemoryHistory } from 'history'

const isTest = process.env.NODE_ENV === 'test'

const history = isTest
  ? createMemoryHistory({ initialEntries: ['/'] })
  : createHashHistory()

export default history
