import { Typography } from '@material-ui/core'
import { ButtonIXSGradient, MobileViewButton } from 'components/Button'
import React, { FC } from 'react'
import { useCookies } from 'react-cookie'
import { t, Trans } from '@lingui/macro'
import { CloseIcon, TYPE } from 'theme'
import { Card } from './styleds'
import metaMask from 'assets/images/metamaskmobile.png'
import trustWallet from 'assets/images/wallet.png'
import coinBase from 'assets/images/coin.png'

export const MobileModal: FC = () => {
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
    <Card style={{ backgroundColor: '#0F0518', display: 'block', marginTop: '30px' }}>
      <Typography
        style={{
          color: 'white',
          minInlineSize: 'max-content',
          marginBottom: '50px',
          fontSize: '22px',
          fontWeight: 600,
        }}
      >
        Connect a wallet
      </Typography>
      <TYPE.title10 style={{ color: '#EDCEFF' }} textAlign="center" marginRight="8px">
        {annoumcementText}
      </TYPE.title10>
      <CloseIcon
        onClick={onClose}
        size="24px"
        style={{ minWidth: 24, minHeight: 24, position: 'absolute', top: '40px', right: '20px' }} // for mobile
        color="white"
        data-testid="cross"
      />
      <MobileViewButton
        // onClick={toggleWalletModal}
        // disabled={!!account}
        data-testid="connect-wallet-in-vault"
      >
        <Trans>
          <img style={{ width: '32px', height: '32px', marginRight: '10px' }} src={metaMask} alt="deleteImg" />
          Metamask Browser
        </Trans>
      </MobileViewButton>

      <MobileViewButton
        // onClick={toggleWalletModal}
        // disabled={!!account}
        data-testid="connect-wallet-in-vault"
      >
        <Trans>
          <img style={{ width: '32px', height: '32px', marginRight: '10px' }} src={trustWallet} alt="deleteImg" />
          Trust Wallet Browser
        </Trans>
      </MobileViewButton>
      <MobileViewButton
        // onClick={toggleWalletModal}
        // disabled={!!account}
        data-testid="connect-wallet-in-vault"
      >
        <Trans>
          <img style={{ width: '32px', height: '32px', marginRight: '10px' }} src={coinBase} alt="deleteImg" />
          Coinbased Wallet Browser
        </Trans>
      </MobileViewButton>
    </Card>
  )
}
