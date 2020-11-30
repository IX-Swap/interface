import { useOfferingsRouter } from 'app/pages/invest/routers/offeringsRouter'

export const OfferingsRoot = () => {
  const { renderRoutes } = useOfferingsRouter()

  return renderRoutes()
}
