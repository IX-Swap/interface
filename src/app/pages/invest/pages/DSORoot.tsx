import { useDSORouter } from 'app/pages/invest/routers/dsoRouter'

export const DSORoot = () => {
  const { renderRoutes } = useDSORouter()

  return renderRoutes()
}
