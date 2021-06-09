import { createBrowserHistory, createMemoryHistory } from 'history'

export const isTestENV = process.env.NODE_ENV === 'test'

export const history = isTestENV
  ? createMemoryHistory({ initialEntries: ['/'] })
  : createBrowserHistory()
