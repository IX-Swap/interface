import { makeURL } from 'config/appURL'

export const IdentityRoute = {
  list: makeURL(['app', 'profile']),
  individual: makeURL(['app', 'profile', 'individualIdentity']),
  corporate: makeURL(['app', 'profile', 'corporateIdentity']),
  createIndividual: makeURL(['app', 'profile', 'individualIdentity', 'create']),
  viewIndividual: makeURL([
    'app',
    'profile',
    'individualIdentity',
    'userId',
    'identityId',
    'view'
  ]),
  editIndividual: makeURL([
    'app',
    'profile',
    'individualIdentity',
    'userId',
    'identityId',
    'edit'
  ]),
  createCorporate: makeURL(['app', 'profile', 'corporateIdentity', 'create']),
  viewCorporate: makeURL([
    'app',
    'profile',
    'corporateIdentity',
    'userId',
    'identityId',
    'view'
  ]),
  editCorporate: makeURL([
    'app',
    'profile',
    'corporateIdentity',
    'userId',
    'identityId',
    'edit'
  ]),
  createCorporateAccreditation: makeURL([
    'app',
    'profile',
    'corporateAccreditation',
    'userId',
    'identityId',
    'create'
  ]),
  viewCorporateAccreditation: makeURL([
    'app',
    'profile',
    'corporateAccreditation',
    'userId',
    'identityId',
    'view'
  ]),
  editCorporateAccreditation: makeURL([
    'app',
    'profile',
    'corporateAccreditation',
    'userId',
    'identityId',
    'edit'
  ]),

  createIndividualAccreditation: makeURL([
    'app',
    'profile',
    'individualAccreditation',
    'userId',
    'identityId',
    'create'
  ]),
  viewIndividualAccreditation: makeURL([
    'app',
    'profile',
    'individualAccreditation',
    'userId',
    'identityId',
    'view'
  ]),
  editIndividualAccreditation: makeURL([
    'app',
    'profile',
    'individualAccreditation',
    'userId',
    'identityId',
    'edit'
  ]),

  identitySuccess: makeURL(['app', 'profile', 'success']),
  createIssuer: '/app/profile/corporates/create-issuer',
  viewIssuer: '/app/profile/corporates/:userId/:identityId/view-issuer',
  editIssuer: '/app/profile/corporates/:userId/:identityId/edit-issuer',
  issuance: '/app/profile/issuance',
  createDetailsOfIssuance: '/app/profile/issuance/create-details-of-issuance',
  createFundManager: '/app/profile/corporates/fund-manager',
  createFundAdmin: '/app/profile/corporates/fund-admin',
  createPortfolioManager: '/app/profile/corporates/portfolio-manager',
  editFundManager:
    '/app/profile/corporates/:userId/:identityId/edit-fund-manager',
  editFundAdmin: '/app/profile/corporates/:userId/:identityId/edit-fund-admin',
  editPortfolioManager:
    '/app/profile/corporates/:userId/:identityId/edit-portfolio-manager',
  viewFundManager:
    '/app/profile/corporates/:userId/:identityId/view-fund-manager',
  viewFundAdmin: '/app/profile/corporates/:userId/:identityId/view-fund-admin',
  viewPortfolioManager:
    '/app/profile/corporates/:userId/:identityId/view-portfolio-manager'
}
