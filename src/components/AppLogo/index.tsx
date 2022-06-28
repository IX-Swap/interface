import React, { useMemo } from 'react'
import { ImageProps } from 'rebass'

import defaultLogoWithText from 'assets/svg/logo_white.svg'
import defaultLogo from 'assets/svg/logo-white.svg'
import { useWhitelabelState } from 'state/whitelabel/hooks'

interface Props extends Pick<ImageProps, 'style'> {
  width?: string
  height?: string
  alt?: string
  withText?: boolean
  className?: string
  src?: string
  [key: string]: any
}

export const useAppLogoSrc = (withText = false) => {
  const { config } = useWhitelabelState()

  const src = useMemo(() => {
    if (withText) {
      return config?.logo || defaultLogoWithText
    }
    return config?.logo || defaultLogo
  }, [config, withText])

  return src
}

export const AppLogo = ({ withText = false, ...rest }: Props) => {
  const src = useAppLogoSrc(withText)

  return <img src={src} alt="app-logo" {...rest} />
}
