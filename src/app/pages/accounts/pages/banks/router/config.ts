import { makeURL } from 'config/appURL'

export const BanksRoute = {
  list: makeURL(['app', 'account', 'bankAccount']),
  view: makeURL(['app', 'account', 'bankAccount', 'bankId', 'view']),
  edit: makeURL(['app', 'account', 'bankAccount', 'bankId', 'edit']),
  create: makeURL(['app', 'account', 'bankAccount', 'create'])
}
