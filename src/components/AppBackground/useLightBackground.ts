import { useState } from 'react'
import { routes } from 'utils/routes'

const useLightBackground = () => {
  const [hasLightBackground, setHasLightBackground] = useState(false)
  window.onhashchange = () => {
    setHasLightBackground(window.location.hash.startsWith(`#${routes.securityTokens()}/`))
  }
  return { hasLightBackground }
}

export default useLightBackground
