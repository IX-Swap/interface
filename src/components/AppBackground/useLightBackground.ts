import { useState } from 'react'
import { routes } from 'utils/routes'

const isSecurityTokenInfoPage = () => window.location.hash.startsWith(`#${routes.securityTokens()}/`)

const useLightBackground = () => {
  const [hasLightBackground, setHasLightBackground] = useState(isSecurityTokenInfoPage())
  window.onhashchange = () => {
    setHasLightBackground(isSecurityTokenInfoPage())
  }
  return { hasLightBackground }
}

export default useLightBackground
