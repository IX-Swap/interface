import { DSOTableColumn } from 'types/dso'

export default interface User {
  _id: string
  roles: string
  email: string
  name: string
  verified: boolean
  accountType: string
  totpConfirmed: boolean
  accessToken: string
  enable2Fa: boolean | undefined
}

export interface CustomField {
  feature: string
  service: string
  columns: Record<DSOTableColumn, boolean>
  customFields: {
    [key: string]: string | number | boolean
  }
}

export interface UpdateCustomFieldArgs {
  columns: Record<DSOTableColumn, boolean>
  customFields: {
    [key: string]: string | number | boolean
  }
}

export interface UserIdentityCreatedStatus {
  issuers: boolean
  investors: boolean
  individual: boolean
}
export interface ManagedUser {
  _id: string
  enabled: boolean
  verified: boolean
  totpConfirmed: boolean
  email: string
  name: string
  roles: string
  createdAt: string
  updatedAt: string
  resetExpiresOn?: string | null
  twoFactorAuth: boolean
  isResetActive: boolean
  identity: UserIdentityCreatedStatus
}

export interface Browser {
  name: string
  version: string
}
export interface UserAgent {
  name: string
  browser: Browser
  browserName: string
}

export interface GeoLocation {
  status: string
  continent: string
  continentCode: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  district: string
  zip: string
  lat: number
  lon: number
  timezone: string
  offset: number
  currency: string
  isp: string
  org: string
  as: string
  asname: string
  mobile: boolean
  proxy: boolean
  hosting: boolean
  query: string
  address: string
  whois: string
  map: string
}

export interface LoginHistory {
  _id: string
  user: User
  ip: string
  userAgent: UserAgent
  createdAt: string
  updatedAt: string
  __v: number
  geolocation: GeoLocation
}
