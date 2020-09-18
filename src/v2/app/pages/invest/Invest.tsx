import { useInvestRouter } from 'v2/app/pages/invest/router'

export const Invest = () => {
  const { renderRoutes } = useInvestRouter()
  return renderRoutes()
}
