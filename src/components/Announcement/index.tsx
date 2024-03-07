import React, { FC } from 'react'
import { useCookies } from 'react-cookie'

import { CloseIcon, TYPE } from 'theme'

import { Card } from './styleds'
import { isMobile } from 'react-device-detect'
import { ReactComponent as InfoIcon } from '../../assets/images/annoumcementIcon.svg'

export const Announcement: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_cookies, setCookie] = useCookies(['annoucementsSeen'])
  const annoumcementText =
    'This application is not mobile optimised. To get the best experience, we recommend using stable version of Chrome, Brave, or any Firefox browsers. For wallets, we recommend Trust Wallet, Metamask, or Coinbase Wallet.'
    
  const onClose = () => {
    setCookie('annoucementsSeen', 'true', {
      path: '/',
    })
  }

  return (
    <Card>
      <InfoIcon style={{ cursor: 'pointer', position: 'absolute', left: isMobile ? '9px' : '40px', top: isMobile ? '38px' : '' }} />
      <TYPE.title10  textAlign="center" marginRight="8px" color="#FFFFFF" padding={isMobile ? '20px' : ''} >
        {annoumcementText}
      </TYPE.title10>
      <CloseIcon
        onClick={onClose}
        size="24px"
        style={{ position: 'absolute', minWidth: 24, minHeight: 24 , marginLeft: isMobile ? '' : '40px', right :isMobile ? '10px' : '10px', top: isMobile ? '38px' : '' }} // for mobile
        color="#FFFFFF"
        data-testid="cross"

      />
    </Card>
  )
}
