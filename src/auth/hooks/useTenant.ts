import { useQuery } from 'react-query'
import { _axios } from 'services/api'
import { useServices } from 'hooks/useServices'
import { tenantsURL } from 'config/apiURL'

export const TENANT_QUERY_KEY = 'tenant'

export const useTenant = () => {
  const { apiService, sessionService } = useServices()
  const subdomain = window.location.host.split('.')[0]
  const code = subdomain.includes(':') ? 'dev' : subdomain

  const url = tenantsURL.getTenantInfoByCode(code)
  const getInfo = async () => await apiService.get(url)

  const { data: result } = useQuery(TENANT_QUERY_KEY, getInfo)

  let tenantId = ''
  let tenantCode = ''
  let companyName = ''
  let theme = ''
  let logoLight = ''
  let logoDark = ''
  let backgroundImage = ''

  if (typeof result !== 'undefined') {
    tenantId = result?.data?._id
    tenantCode = result?.data?.tenantCode
    companyName = result?.data?.companyName
    theme = result?.data?.theme
    logoLight = result?.data?.logoLight
    logoDark = result?.data?.logoDark
    backgroundImage = result?.data?.backgroundImage
  }

  sessionService.set('tenantId', tenantId)
  sessionService.set('tenantCode', tenantCode)
  sessionService.set('companyName', companyName)
  sessionService.set('tenantThemeName', theme)
  sessionService.set('logoLight', logoLight)
  sessionService.set('logoDark', logoDark)
  sessionService.set('backgroundImage', backgroundImage)
  sessionService.set('mobileMode', true)

  _axios.defaults.headers.common['X-Subdomain'] = subdomain
  _axios.defaults.headers.common['X-Tenant-ID'] = tenantId

  return null
}
