import React, { FC } from 'react'
import styled from 'styled-components'

const Logo = styled.img<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ width }) => width};
  border-radius: 50%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 36px;
    height: 36px;
  `}
`

interface TokenLogoProps {
  logo: {
    storageUrl: string
    uuid: string
  }
  width?: string
  height?: string
}

export const TokenLogo: FC<TokenLogoProps> = ({ logo, width = '72px', height = '72px' }: TokenLogoProps) => {
  if (!logo) return null

  const { storageUrl, uuid } = logo
  return <Logo width={width} height={height} src={`${storageUrl}${uuid}`} />
}
