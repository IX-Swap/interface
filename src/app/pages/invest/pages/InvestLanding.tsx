import { useInvestListRouter } from 'app/pages/invest/routers/investLandingRouter'

export const InvestLanding = () => {
  const { renderRoutes } = useInvestListRouter()

  return renderRoutes()
}
