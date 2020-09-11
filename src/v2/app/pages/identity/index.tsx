import React from 'react'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'

export const Identity: React.FC = () => {
  const { renderRoutes } = useIdentitiesRouter()

  return renderRoutes()
}
