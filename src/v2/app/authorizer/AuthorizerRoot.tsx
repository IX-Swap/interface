import React from 'react'
import { useAuthorizerRouter } from 'v2/app/authorizer/router'

export const AuthorizerRoot: React.FC = () => {
  const { renderRoutes } = useAuthorizerRouter()
  return renderRoutes()
}
