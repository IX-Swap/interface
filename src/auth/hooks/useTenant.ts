import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { tenantsURL } from 'config/apiURL'
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

export const useTenant = async () => {
  const { apiService, storageService } = useServices()
  const subdomain = window.location.host.split('.')[0]

  const url = tenantsURL.getTenantInfo(subdomain)
  const getInfo = async () => await apiService.get(url)

  const { data: result } = await useQuery(TENANT_QUERY_KEY, getInfo)

  //   console.log(result)

  let companyName = ''
  let theme = ''
  //   let logoLight = ''
  //   let logoDark = ''
  //   let backgroundUrl = ''

  if (typeof result !== 'undefined') {
    companyName = result?.data?.companyName
    theme = result?.data?.theme
    // logoLight = result?.data?.logoLight
    // logoDark = result?.data?.logoDark
    // backgroundUrl = result?.data?.backgroundUrl
  }

  storageService.set('companyName', companyName)
  storageService.set('tenantThemeName', theme)

  const tenant = tenants.find(t => t._id === subdomain)

  storageService.set('logoUrl', tenant?.logoUrl)
  storageService.set('backgroundUrl', tenant?.backgroundUrl)

  return null
}
