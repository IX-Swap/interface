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
    'userId',
    'identityId',
    'view'
  ]),
  editIndividual: makeURL([
    'app',
    'identity',
    'individualIdentity',
    'userId',
    'identityId',
    'edit'
  ]),
  createCorporate: makeURL(['app', 'identity', 'corporateIdentity', 'create']),
  corporate: makeURL([
    'app',
    'identity',
    'corporateIdentity',
    'userId',
    'identityId',
    'view'
  ]),
  editCorporate: makeURL([
    'app',
    'identity',
    'corporateIdentity',
    'userId',
    'identityId',
    'edit'
  ]),
  createIssuer: '/app/identity/corporates/create-issuer',
  viewIssuer: '/app/identity/corporates/:userId/:identityId/view-issuer',
  editIssuer: '/app/identity/corporates/:userId/:identityId/edit-issuer'
}
