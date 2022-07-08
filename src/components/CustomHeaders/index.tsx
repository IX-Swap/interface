import React from 'react'
import Helmet from 'react-helmet'

import defaultFavicon from 'assets/images/favicon.png'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import loadingIcon from 'assets/images/loader_thin.svg'

export const CustomHeaders = () => {
  const { config } = useWhitelabelState()
  if (!config) {
    return (
      <Helmet>
        <title>Loading...</title>
        <link rel="icon" href={loadingIcon} sizes="32x32" />
      </Helmet>
    )
  }

  return (
    <Helmet>
      <title>{config.title || 'IX Swap'}</title>
      <link rel="icon" href={config.faviconUrl || defaultFavicon} sizes="32x32" />
    </Helmet>
  )
}
