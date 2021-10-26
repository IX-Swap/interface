import { useTheme } from '@material-ui/core'
import React from 'react'

export interface ReportLogo {
  isAtlasOne: boolean
}

export const ReportLogo = ({ isAtlasOne }: ReportLogo) => {
  const theme = useTheme()

  return isAtlasOne ? (
    <img
      width={70}
      height='auto'
      src={require(theme.palette.type === 'light'
        ? 'assets/icons/atlas_logo.png'
        : 'assets/icons/atlas_logo_white.png')}
      alt={'Atlas One'}
    />
  ) : (
    <img
      width={70}
      height='auto'
      src={require('assets/icons/logo-color.svg')}
      alt={'InvestaX'}
    />
  )
}
