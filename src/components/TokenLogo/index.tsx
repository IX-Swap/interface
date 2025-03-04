import React, { FC } from 'react'
import styled from 'styled-components'
import { getPublicAssetUrl } from './utils'
import { Asset } from 'state/launchpad/types'

const Logo = styled.img<{ width: string; height: string; borderRadius: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 36px;
    height: 36px;
  `}
`

interface TokenLogoProps {
  logo?: Asset | string
  width?: string
  height?: string
  borderRadius?: string
}

export const TokenLogo: FC<TokenLogoProps> = ({
  logo,
  width = '72px',
  height = '72px',
  borderRadius = '50%',
}: TokenLogoProps) => {
  if (!logo) return null

  let src: string = ''

  if (typeof logo === 'string') {
    src = logo // Handle case where logo is a URL string
  } else if (logo.uuid) {
    src = getPublicAssetUrl(logo) // This function is not imported
  }

  return <Logo width={width} height={height} borderRadius={borderRadius} src={src} />
}
