import { InternalRouteProps } from 'types/util'

export const EducationCentreRoute = {
  reports: '/app/education-centre/reports',
  news: '/app/education-centre/news',
  securitiesMarkets: '/app/education-centre/securities-markets',
  security: '/app/education-centre/securities-markets/:ticker'
}

export const educationCentreLinks: InternalRouteProps[] = [
  {
    label: 'News',
    path: EducationCentreRoute.news
  },
  {
    label: 'Reports',
    path: EducationCentreRoute.reports
  },
  {
    label: 'Research Terminal',
    path: EducationCentreRoute.securitiesMarkets
  }
]
