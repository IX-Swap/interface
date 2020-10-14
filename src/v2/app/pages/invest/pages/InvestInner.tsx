import { useInvestListRouter } from 'v2/app/pages/invest/routers/investLandingRouter'

export const InvestInner = () => {
  const { renderRoutes } = useInvestListRouter()

  return renderRoutes()
}
