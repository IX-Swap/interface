import { useTheme } from '@material-ui/core'
import React from 'react'
import AtlasLogoLight from 'assets/icons/atlas_logo_white.png'
import AtlasLogoDark from 'assets/icons/atlas_logo.png'
import InvestaXLogo from 'assets/icons/logo-color.svg'

export interface ReportLogoProps {
  isAtlasOne: boolean
}

export const ReportLogo = ({ isAtlasOne }: ReportLogoProps) => {
  const theme = useTheme()

  return isAtlasOne ? (
    <img
      width={70}
      height='auto'
      src={theme.palette.type === 'light' ? AtlasLogoDark : AtlasLogoLight}
      alt={'Atlas One'}
    />
  ) : (
    <img width={70} height='auto' src={InvestaXLogo} alt={'InvestaX'} />
  )
}
