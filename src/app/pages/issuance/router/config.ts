import { makeURL } from 'config/appURL'

export const IssuanceRoute = {
  list: makeURL(['app', 'issuance', 'offerings']),
  view: makeURL(['app', 'issuance', 'offerings', 'dsoId', 'view']),
  insight: makeURL(['app', 'issuance', 'offerings', 'dsoId', 'overview']),
  deployToken: makeURL([
    'app',
    'issuance',
    'offerings',
    'dsoId',
    'deployments'
  ]),
  edit: makeURL(['app', 'issuance', 'offerings', 'dsoId', 'edit']),
  create: makeURL(['app', 'issuance', 'offerings', 'create'])
}
