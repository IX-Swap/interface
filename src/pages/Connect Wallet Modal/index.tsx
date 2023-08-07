import { ButtonIXSGradient } from 'components/Button'
import React, { FC, useState } from 'react'
import { TYPE } from 'theme'
import Column from 'components/Column'

import Modal from 'components/Modal'
import metamaskmobile from 'assets/images/metamaskmobile.png'
import trust from 'assets/images/trust.png'
import coinbase from 'assets/images/coinbase.png'
import { FormCard } from './styleds'

export const ConnectWalletModal: FC = () => {
  const [showTaxModal, setShowTaxModal] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (
    <Modal name={'connectWallet'} isOpen={showTaxModal} onDismiss={() => setShowTaxModal(true)}>
      <FormCard>
        <Column style={{ alignItems: 'stretch' }}>
          <TYPE.mediumHeader>Connect A Wallet</TYPE.mediumHeader>
          <br />
          <TYPE.description2>
            You are accessing IX Swap through a mobile phone. To connect a wallet, we recommend using browsers from
            Metamask, Trust Wallet, Coinbase Wallet. See links below for more information:
            <br />
          </TYPE.description2>

          <ButtonIXSGradient
            type="button"
            onClick={() =>
              location.replace(
                'https://support.metamask.io/hc/en-us/articles/6356387482523-How-to-use-the-MetaMask-Mobile-Browser'
              )
            }
            style={{
              width: '100%',
              marginTop: '32px',
              background: '#1f1129',
              color: '#EDCEFF',
              justifyContent: 'left',

              fontSize: '15px',
            }}
          >
            <img style={{ width: '32px', height: '32px', marginRight: '10px' }} src={metamaskmobile} alt="homeImg" />
            Metamask Browser
          </ButtonIXSGradient>
          <ButtonIXSGradient
            type="button"
            onClick={() => location.replace('https://trustwallet.com/dapp/')}
            style={{
              width: '100%',
              marginTop: '32px',
              background: '#1f1129',
              color: '#EDCEFF',
              justifyContent: 'left',
              fontSize: '15px',
            }}
          >
            <img style={{ width: '32px', height: '32px', marginRight: '10px' }} src={trust} alt="groupImg" />
            Trust Wallet Browser
          </ButtonIXSGradient>

          <ButtonIXSGradient
            type="button"
            onClick={() => location.replace('https://help.coinbase.com/en/wallet/other-topics/what-is-a-dapp')}
            style={{
              width: '100%',
              marginTop: '32px',
              background: '#1f1129',
              color: '#EDCEFF',
              justifyContent: 'left',
              fontSize: '15px',
            }}
          >
            <img style={{ width: '32px', height: '32px', marginRight: '10px' }} src={coinbase} alt="groupImg" />
            Coinbased Wallet Browser
          </ButtonIXSGradient>
        </Column>
      </FormCard>
    </Modal>
  )
}
