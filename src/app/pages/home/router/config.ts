import { makeURL } from 'config/appURL'

export const HomeRoute = {
  landing: makeURL(['app', 'home']),
  securitiesMarkets: '/app/home/securities-markets',
  security: '/app/home/securities-markets/:ticker'
}
