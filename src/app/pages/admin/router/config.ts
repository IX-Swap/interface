import { makeURL } from 'config/appURL'

export const AdminRoute = {
  users: makeURL(['app', 'admin', 'users']),
  view: makeURL(['app', 'admin', 'users', 'userId', 'view']),
  accessReports: makeURL(['app', 'admin', 'accessReports']),
  createIndividualIdentity: '/app/admin/users/:userId/createIndividual',
  createCorporateIdentity: '/app/admin/users/:userId/createCorporate',
  createIssuerIdentity: '/app/admin/users/:userId/createIssuer'
}
