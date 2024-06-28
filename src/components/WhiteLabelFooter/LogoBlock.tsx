import React from 'react'

import { AppLogo } from 'components/AppLogo'
import { LogoBlockContainer } from './styleds'

export const LogoBlock = () => {
  return (
    <LogoBlockContainer>
      <AppLogo withText height="49px" width="auto" />
    </LogoBlockContainer>
  )
}
