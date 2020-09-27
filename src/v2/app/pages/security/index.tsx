import React from 'react'
import { useSecurityRouter } from 'v2/app/pages/security/routes'

export const SecurityRoot: React.FC = () => {
  const { renderRoutes } = useSecurityRouter()
  return renderRoutes()
}
