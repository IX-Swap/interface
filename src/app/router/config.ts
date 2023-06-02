const getTenantId: any = sessionStorage.getItem('tenantId')
const tenantId: number = JSON.parse(getTenantId)

export const AppRoute = {
  home: '/app/home',
  authorizer: '/app/authorizer',
  identity: '/app/profile',
  accounts: '/app/accounts',
  issuance: '/app/issuance',
  invest: '/app/invest',
  admin: '/app/admin',
  OTCMarket: '/app/OTCMarket',
  security: '/app/settings',
  notifications: '/app/notifications',
  educationCentre: '/app/education-centre',
  fundsManagement: '/app/funds-management',
  editClientSpace: `/app/admin/tenants/${tenantId}/edit`
}