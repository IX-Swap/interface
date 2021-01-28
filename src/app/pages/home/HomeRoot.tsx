import { useHomeRouter } from 'app/pages/home/router'

export const HomeRoot = () => {
  const { renderRoutes } = useHomeRouter()

  return renderRoutes()
}
