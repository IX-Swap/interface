import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'

export const IssuanceRoute = {
  root: makeURL(['app', 'issuance']),
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
    'issuerId',
    'dsoId',
    'deployments'
  ]),
  edit: makeURL(['app', 'issuance', 'offerings', 'issuerId', 'dsoId', 'edit']),
  create: makeURL(['app', 'issuance', 'offerings', 'create']),
  commitments: makeURL(['app', 'issuance', 'commitments', 'issuerId', 'dsoId']),
  capTable: makeURL(['app', 'issuance', 'captable', 'issuerId', 'dsoId']),
  manageDistributions: makeURL([
    'app',
    'issuance',
    'captable',
    'issuerId',
    'dsoId',
    'manageDistributions'
  ]),
  dashboard: '/app/issuance/dashboard',
  financialReports: '/app/issuance/financial-reports',
  uploadReport: '/app/issuance/financial-reports/upload',
  viewReport: '/app/issuance/financial-reports/:reportId',
  myListings: '/app/issuance/my-listings',
  createListing: '/app/issuance/create',
  editListing: '/app/issuance/my-listings/:listingId/edit',
  viewListing: '/app/issuance/my-listings/:listingId/view',
  previewListing: '/app/issuance/my-listings/:issuerId/:listingId/preview'
}

export const issuanceLandingLinks: InternalRouteProps[] = [
  { label: 'Create New DSO', path: IssuanceRoute.create },
  { label: 'View DSO Listings', path: IssuanceRoute.list },
  { label: 'Create Exchange Listings', path: IssuanceRoute.createListing },
  { label: 'View Exchange Listings', path: IssuanceRoute.myListings },
  { label: 'Financial Reports', path: IssuanceRoute.financialReports }
]
