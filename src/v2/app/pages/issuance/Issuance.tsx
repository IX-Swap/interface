import { useIssuanceRouter } from 'v2/app/pages/issuance/router'

export const Issuance = () => {
  const { renderRoutes } = useIssuanceRouter()

  return renderRoutes()
}
