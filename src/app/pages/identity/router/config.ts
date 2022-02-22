import { makeURL } from 'config/appURL'

export const IdentityRoute = {
  list: makeURL(['app', 'identity']),
  individual: makeURL(['app', 'identity', 'individualIdentity']),
  corporate: makeURL(['app', 'identity', 'corporateIdentity']),
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
  viewCorporate: makeURL([
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
  editIssuer: '/app/identity/corporates/:userId/:identityId/edit-issuer',
  issuance: '/app/identity/issuance',
  createDetailsOfIssuance: '/app/identity/issuance/create-details-of-issuance',
  createFundManager: '/app/identity/corporates/fund-manager',
  createFundAdmin: '/app/identity/corporates/fund-admin',
  createPortfolioManager: '/app/identity/corporates/portfolio-manager'
}
