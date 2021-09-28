import { useEffect, useState } from 'react'
import { routes } from 'utils/routes'
const LIGHT_PAGES = [`${routes.securityTokens()}/`]

const useLightBackground = () => {
  const isLightPage = () => LIGHT_PAGES.some((route) => window.location.hash.startsWith(`#${route}`))
  const [hasLightBackground, setHasLightBackground] = useState(isLightPage())
  const handleEvent = () => {
    setHasLightBackground(isLightPage())
  }
  useEffect(() => {
    window.addEventListener('hashchange', handleEvent)
    return () => {
      window.removeEventListener('hashchange', handleEvent)
    }
  }, [])
  window.onhashchange = () => {
    setHasLightBackground(isLightPage())
  }
  return { hasLightBackground }
}

export default useLightBackground
