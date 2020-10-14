import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'

export const OfferingsRoot = () => {
  const { renderRoutes } = useOfferingsRouter()

  return renderRoutes()
}
