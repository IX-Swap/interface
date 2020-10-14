import { useCommitmentRouter } from 'v2/app/pages/invest/routers/commitmentsRouter'

export const CommitmentsRoot = () => {
  const { renderRoutes } = useCommitmentRouter()
  return renderRoutes()
}
