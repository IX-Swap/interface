import { makeURL } from 'config/appURL'

export const HomeRoute = {
  landing: makeURL(['app', 'home']),
  news: '/app/home/news',
  securitiesMarkets: '/app/home/securities-markets',
  security: '/app/home/securities-markets/:ticker'
}
