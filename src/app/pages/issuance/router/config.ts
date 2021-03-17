import { makeURL } from 'config/appURL'

export const IssuanceRoute = {
  list: makeURL(['app', 'issuance', 'offerings']),
  view: makeURL(['app', 'issuance', 'offerings', 'issuerId', 'dsoId', 'view']),
  preview: makeURL([
    'app',
    'issuance',
    'offerings',
    'issuerId',
    'dsoId',
    'preview'
  ]),
  insight: makeURL([
    'app',
    'issuance',
    'offerings',
    'issuerId',
    'dsoId',
    'overview'
  ]),
  deployToken: makeURL([
    'app',
    'issuance',
    'offerings',
    'dsoId',
    'deployments'
  ]),
  edit: makeURL(['app', 'issuance', 'offerings', 'issuerId', 'dsoId', 'edit']),
  create: makeURL(['app', 'issuance', 'offerings', 'create'])
}
