import { makeURL } from 'config/appURL'

export const AdminRoute = {
  users: makeURL(['app', 'admin']),
  view: makeURL(['app', 'admin', 'users', 'userId', 'view']),
  accessReports: makeURL(['app', 'admin', 'accessReports'])
}
