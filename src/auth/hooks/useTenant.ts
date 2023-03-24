import { useServices } from 'hooks/useServices'

interface Tenant {
  _id: string
  name: string
  logoUrl: string
  backgroundUrl: string
  tenantThemeName: string
}

const tenants: Tenant[] = [
  {
    _id: 'tenant1',
    name: 'Tenant 1',
    logoUrl: 'https://app.ixswap.io/static/media/logo-white.f35ac2af.svg',
    backgroundUrl:
      'https://files.123freevectors.com/wp-content/original/144591-indigo-background-illustration.jpg',
    tenantThemeName: 'purple'
  },
  {
    _id: 'tenant2',
    name: 'Tenant 2',
    logoUrl: 'https://app.ixswap.io/static/media/logo-white.f35ac2af.svg',
    backgroundUrl: 'https://wallpapercave.com/wp/wp8823059.jpg',
    tenantThemeName: 'orange'
  }
]

export const TENANT_QUERY_KEY = 'tenant'

export const useTenant = () => {
  const { storageService } = useServices()
  const subdomain = window.location.host.split('.')[0]
  console.log(subdomain)

  const tenant = tenants.find(t => t._id === 'tenant1')

  storageService.set('name', tenant?.name)
  storageService.set('logoUrl', tenant?.logoUrl)
  storageService.set('backgroundUrl', tenant?.backgroundUrl)
  storageService.set('tenantThemeName', tenant?.tenantThemeName)

  return null
}
