import React from 'react'
import { useDSRouter } from 'app/pages/accounts/pages/digitalSecurities/router'

export const DigitalSecurities: React.FC = () => {
  const { renderRoutes } = useDSRouter()

  return renderRoutes()
}
