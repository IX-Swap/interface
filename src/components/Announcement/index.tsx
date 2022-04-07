import React, { FC } from 'react'
import { useCookies } from 'react-cookie'

import { CloseIcon, TYPE } from 'theme'

import { Card } from './styleds'

export const Announcement: FC = () => {
  const [_cookies, setCookie] = useCookies(['annoucementsSeen'])
  const annoumcementText =
    'For the best performance of the app we recommend to use recent stable versions of Chrome, Brave or Firefox browsers, or Trust Wallet, Metamask, Coinbase Wallet apps on smartphone.'

  const onClose = () => {
    setCookie('annoucementsSeen', 'true', {
      path: '/',
    })
  }

  return (
    <Card>
      <TYPE.title10 textAlign="center" marginRight="8px" color="bg1">
        {annoumcementText}
      </TYPE.title10>
      <CloseIcon
        onClick={onClose}
        size="24px"
        style={{ minWidth: 24, minHeight: 24 }} // for mobile
        color="#1A123A"
        data-testid="cross"
      />
    </Card>
  )
}
