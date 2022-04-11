import React, { FC } from 'react'

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
  return <img width={width} height={height} style={{ borderRadius: '50%' }} src={`${storageUrl}${uuid}`} />
}
