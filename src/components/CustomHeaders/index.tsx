import React from 'react'
import Helmet from 'react-helmet'

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
      <title>{config?.title}</title>
      <link rel="icon" href={config?.faviconUrl} sizes="32x32" />
      <meta name="robots" content="index, follow" />
      <meta name="description" content={config?.description} />
      <meta property="og:title" content={config?.title} />
      <meta property="og:title" content={config?.title} />
      <meta property="og:image" content={config?.bannerImageUrl} />
      <meta property="og:url" content={config?.domain} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={config?.title} />
      <link rel="apple-touch-icon" href={config?.faviconUrl} />
    </Helmet>
  )
}
