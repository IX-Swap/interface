import { useCommitmentRouter } from 'app/pages/invest/routers/commitmentsRouter'

export const CommitmentsRoot = () => {
  const { renderRoutes } = useCommitmentRouter()
  return renderRoutes()
}
