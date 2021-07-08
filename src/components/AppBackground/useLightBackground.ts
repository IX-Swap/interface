import { useEffect, useState } from 'react'
import { routes } from 'utils/routes'

const useLightBackground = () => {
  const isSecurityTokenInfoPage = () => window.location.hash.startsWith(`#${routes.securityTokens()}/`)
  const [hasLightBackground, setHasLightBackground] = useState(isSecurityTokenInfoPage())
  const handleEvent = () => {
    setHasLightBackground(isSecurityTokenInfoPage())
  }
  useEffect(() => {
    window.addEventListener('hashchange', handleEvent)
    return () => {
      window.removeEventListener('hashchange', handleEvent)
    }
  })
  window.onhashchange = () => {
    setHasLightBackground(isSecurityTokenInfoPage())
  }
  return { hasLightBackground }
}

export default useLightBackground
