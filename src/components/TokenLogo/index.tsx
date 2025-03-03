import React, { FC } from 'react'
import styled from 'styled-components'

const apiUrl = process.env.REACT_APP_API_URL

const Logo = styled.img<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 50%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 36px;
    height: 36px;
  `}
`

interface TokenLogoProps {
  logo:
    | {
        uuid?: string
      }
    | string
  width?: string
  height?: string
}

export const TokenLogo: FC<TokenLogoProps> = ({ logo, width = '72px', height = '72px' }: TokenLogoProps) => {
  if (!logo) return null

  let src: string = ''

  if (typeof logo === 'string') {
    src = logo // Handle case where logo is a URL string
  } else if (logo.uuid) {
    const storageUrl = apiUrl + 'storage/file/public/'
    src = `${storageUrl}${logo.uuid}` // Handle case where logo is an object with uuid
  }

  return <Logo width={width} height={height} src={src} />
}
