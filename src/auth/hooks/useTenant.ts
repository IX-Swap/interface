import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { tenantsURL } from 'config/apiURL'

export const TENANT_QUERY_KEY = 'tenant'

export const useTenant = async () => {
  const { apiService, storageService } = useServices()
  const subdomain = window.location.host.split('.')[0]
  const tenantCode = subdomain.includes(':') ? 'dev' : subdomain

  const url = tenantsURL.getTenantInfoByCode(tenantCode)
  const getInfo = async () => await apiService.get(url)

  const { data: result } = await useQuery(TENANT_QUERY_KEY, getInfo)

  let tenantId = ''
  let companyName = ''
  let theme = ''
  let logoLight = ''
  let logoDark = ''
  let backgroundImage = ''

  if (typeof result !== 'undefined') {
    tenantId = result?.data?._id
    companyName = result?.data?.companyName
    theme = result?.data?.theme
    logoLight = result?.data?.logoLight
    logoDark = result?.data?.logoDark
    backgroundImage = result?.data?.backgroundImage
  }

  storageService.set('tenantId', tenantId)
  storageService.set('companyName', companyName)
  storageService.set('tenantThemeName', theme)
  storageService.set('logoLight', logoLight)
  storageService.set('logoDark', logoDark)
  storageService.set('backgroundImage', backgroundImage)

  return null
}
