import { makeURL } from 'config/appURL'

export const IdentityRoute = {
  list: makeURL(['app', 'identity']),
  createIndividual: makeURL([
    'app',
    'identity',
    'individualIdentity',
    'create'
  ]),
  viewIndividual: makeURL([
    'app',
    'identity',
    'individualIdentity',
    'identityId',
    'view'
  ]),
  editIndividual: makeURL([
    'app',
    'identity',
    'individualIdentity',
    'identityId',
    'edit'
  ]),
  createCorporate: makeURL(['app', 'identity', 'corporateIdentity', 'create']),
  corporate: makeURL([
    'app',
    'identity',
    'corporateIdentity',
    'identityId',
    'view'
  ]),
  editCorporate: makeURL([
    'app',
    'identity',
    'corporateIdentity',
    'identityId',
    'edit'
  ]),
  createIssuer: '/app/identity/corporates/create-issuer',
  viewIssuer: '/app/identity/corporates/:identityId/view-issuer',
  editIssuer: '/app/identity/corporates/:identityId/edit-issuer'
}
