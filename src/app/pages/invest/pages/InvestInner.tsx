import { useInvestListRouter } from 'app/pages/invest/routers/investLandingRouter'

export const InvestInner = () => {
  const { renderRoutes } = useInvestListRouter()

  return renderRoutes()
}
