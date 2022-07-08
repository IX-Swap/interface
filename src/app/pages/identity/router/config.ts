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
  identitySuccess: makeURL(['app', 'identity', 'success']),
  createIssuer: '/app/identity/corporates/create-issuer',
  viewIssuer: '/app/identity/corporates/:userId/:identityId/view-issuer',
  editIssuer: '/app/identity/corporates/:userId/:identityId/edit-issuer',
  issuance: '/app/identity/issuance',
  createDetailsOfIssuance: '/app/identity/issuance/create-details-of-issuance',
  createFundManager: '/app/identity/corporates/fund-manager',
  createFundAdmin: '/app/identity/corporates/fund-admin',
  createPortfolioManager: '/app/identity/corporates/portfolio-manager',
  editFundManager:
    '/app/identity/corporates/:userId/:identityId/edit-fund-manager',
  editFundAdmin: '/app/identity/corporates/:userId/:identityId/edit-fund-admin',
  editPortfolioManager:
    '/app/identity/corporates/:userId/:identityId/edit-portfolio-manager',
  viewFundManager:
    '/app/identity/corporates/:userId/:identityId/view-fund-manager',
  viewFundAdmin: '/app/identity/corporates/:userId/:identityId/view-fund-admin',
  viewPortfolioManager:
    '/app/identity/corporates/:userId/:identityId/view-portfolio-manager'
}
