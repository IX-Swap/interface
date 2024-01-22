import React, { FC } from 'react'
import { useCookies } from 'react-cookie'

import { CloseIcon, TYPE } from 'theme'

import { Card } from './styleds'
import { isMobile } from 'react-device-detect'

export const Announcement: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_cookies, setCookie] = useCookies(['annoucementsSeen'])
  const annoumcementText =
    'To get the best performance of the app, we recommend using any of the recent stable versions of the Chrome, Brave, or any Firefox browsers. For wallets, we recommend Trust Wallet, Metamask, or Coinbase Wallet.'
    
  const onClose = () => {
    setCookie('annoucementsSeen', 'true', {
      path: '/',
    })
  }

  return (
    <Card>
      <TYPE.title10  textAlign="center" marginRight="8px" color="#FFFFFF">
        {annoumcementText}
      </TYPE.title10>
      <CloseIcon
        onClick={onClose}
        size="24px"
        style={{ minWidth: 24, minHeight: 24 , marginLeft: isMobile ? '' : '40px'}} // for mobile
        color="#FFFFFF"
        data-testid="cross"

      />
    </Card>
  )
}
