import React from 'react'
import Helmet from 'react-helmet'

import defaultFavicon from 'assets/images/favicon.png'
import { useWhitelabelState } from 'state/whitelabel/hooks'

export const CustomHeaders = () => {
  const { config } = useWhitelabelState()
  if (!config) return null

  return (
    <Helmet>
      <title>{config.title || 'IX Swap'}</title>
      <link rel="icon" href={config.faviconUrl || defaultFavicon} sizes="32x32" />
    </Helmet>
  )
}
