import { AppFeature, AppService } from 'types/app'

export const stripColonFromURLParam = (param: string) => param.replace(/:/, '')

export const getServiceFromURL = (service: string) => {
  return Object.entries(AppService).find(([value]) => value === service)
}

export const getCurrentLocationData = (pathname: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, module, service, feature, ...params] = pathname.split('/')

  return {
    service: service as AppService,
    feature: feature as AppFeature,
    module,
    params
  }
}
