import User, { LoginHistory, ManagedUser } from 'types/user'

export const user: User = {
  verified: true,
  totpConfirmed: false,
  accountType: 'Unset',
  _id: '5f3152ef2d2dfb4291fccce2',
  email: 'alex@investax.io',
  name: 'Alex Solovev',
  roles: 'admin',
  accessToken: ''
}

export const managedUser: ManagedUser = {
  _id: '5feb0bf09909361a0cb71446',
  enabled: true,
  verified: true,
  totpConfirmed: false,
  email: 'selmer+1@investax.io',
  name: 'Nube Nueno',
  roles: 'user,accredited,issuer,authorizer,admin',
  createdAt: '2020-12-29T10:58:56.683Z',
  updatedAt: '2021-01-20T16:29:59.285Z',
  resetExpiresOn: '2021-01-20T16:37:38.267Z',
  twoFactorAuth: true,
  isResetActive: true
}

export const loginHistory: LoginHistory = {
  _id: '6006752c7130c0754e78e925',
  user: user,
  ip: '124.104.206.110',
  userAgent: {
    name: 'PostmanRuntime/7.26.8',
    browser: {
      name: '',
      version: ''
    },
    browserName: 'Unknown'
  },
  createdAt: '2021-01-19T05:59:08.661Z',
  updatedAt: '2021-01-19T05:59:08.661Z',
  __v: 0,
  geolocation: {
    status: 'success',
    continent: 'Asia',
    continentCode: 'AS',
    country: 'Philippines',
    countryCode: 'PH',
    region: '03',
    regionName: 'Central Luzon',
    city: 'Olongapo City',
    district: '',
    zip: '2200',
    lat: 14.8257,
    lon: 120.2815,
    timezone: 'Asia/Manila',
    offset: 28800,
    currency: 'PHP',
    isp: 'Philippine Long Distance Telephone Co.',
    org: '',
    as: 'AS9299 Philippine Long Distance Telephone Company',
    asname: 'IPG-AS-AP',
    mobile: false,
    proxy: false,
    hosting: false,
    query: '124.104.206.110',
    address: '2200, Olongapo City, 03, Philippines',
    whois: 'https://extreme-ip-lookup.com/124.104.206.110',
    map: 'https://www.google.com/maps/@14.8257,120.2815,10z'
  }
}
