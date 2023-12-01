import React from 'react'
import ReactGA from 'react-ga'

import styled from 'styled-components'

import { SUPPORTED_WALLETS, WalletInfo } from 'constants/wallet'

import { ConnectionOptions } from './ConnectionOptions'
import { ConnectionLoader } from './ConnectionLoader'

import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import { ReactComponent as CrossIcon } from 'assets/launchpad/svg/close.svg'
import { text13 } from 'components/LaunchpadMisc/typography'
import { isMobile } from 'react-device-detect'
import { ContentWrapper, HeaderRow, HoverText } from 'components/WalletModal/styleds'
import Column from 'components/Column'
import { TYPE } from 'theme'
import { ButtonOutlined } from 'components/Button'
import metamaskmobile from 'assets/images/metamaskmobile.png'
import trust from 'assets/images/trust.png'
import coinbase from 'assets/images/coinbase.png'
import { Trans } from '@lingui/macro'

export enum PromptView {
  options,
  optionsSecondary,
  pending,
  account,
}

interface Props {
  onConnect: () => void
  onClose: () => void
}

export const ConnectionDialog: React.FC<Props> = (props) => {
  const { activate } = useWeb3React()
  const [walletView, setWalletView] = React.useState(PromptView.options)
  const [, setPendingWallet] = React.useState<AbstractConnector | undefined>()
  const [, setPendingError] = React.useState<boolean>()

  const tryActivation = React.useCallback(
    async (connector: AbstractConnector | undefined) => {
      const wallet = Object.values(SUPPORTED_WALLETS).find((wallet) => wallet.connector === connector)

      window.ym(84960586, 'reachGoal', 'commonMetamaskChosenAsWallet')
      ReactGA.event({ category: 'Wallet', action: 'Change Wallet', label: wallet?.name ?? '' })

      setPendingWallet(connector) // set wallet for pending view
      setWalletView(PromptView.pending)

      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined
      }

      if (!connector) {
        return
      }

      try {
        await activate(connector, undefined, true)
        setWalletView(PromptView.account)

        props.onConnect()
      } catch (error) {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector) // a little janky...can't use setError because the connector isn't set
        } else {
          activate(connector) // a little janky...can't use setError because the connector isn't set
          setPendingError(true)
        }
      }
    },
    [activate]
  )

  const onSelect = React.useCallback((option: WalletInfo) => tryActivation(option.connector), [tryActivation])

  return (
    <ModalContainer>

      <ExitIconContainer onClick={props.onClose}>
        <CrossIcon />
      </ExitIconContainer>

      {isMobile ? (
        <ContentWrapper>
                 <HeaderRow>
            <HoverText>
              <Trans>Connect to a wallet</Trans>
            </HoverText>
          </HeaderRow>
          <Column style={{ alignItems: 'stretch' }}>
            <br />
            <TYPE.description2>
              You are accessing IX Swap through a mobile phone. To connect a wallet, we recommend using browsers from
              Metamask, Trust Wallet, Coinbase Wallet. See links below for more information:
              <br />
            </TYPE.description2>

            <ButtonOutlined
              type="button"
              onClick={() =>
                location.replace(
                  'https://support.metamask.io/hc/en-us/articles/6356387482523-How-to-use-the-MetaMask-Mobile-Browser'
                )
              }
              style={{
                width: '100%',
                marginTop: '32px',
                color: 'black',
                justifyContent: 'left',
                fontSize: '13px',
              }}
            >
              <img style={{ width: '32px', height: '32px', marginRight: '10px' }} src={metamaskmobile} alt="homeImg" />
              Metamask Browser
            </ButtonOutlined>
            <ButtonOutlined
              type="button"
              onClick={() => location.replace('https://trustwallet.com/dapp/')}
              style={{
                width: '100%',
                marginTop: '32px',
                color: 'black',

                justifyContent: 'left',
                fontSize: '13px',
              }}
            >
              <img style={{ width: '32px', height: '32px', marginRight: '10px' }} src={trust} alt="groupImg" />
              Trust Wallet Browser
            </ButtonOutlined>

            <ButtonOutlined
              type="button"
              onClick={() => location.replace('https://help.coinbase.com/en/wallet/other-topics/what-is-a-dapp')}
              style={{
                width: '100%',
                marginTop: '32px',
                color: 'black',
                justifyContent: 'left',
                fontSize: '12px',
              }}
            >
              <img style={{ width: '32px', height: '32px', marginRight: '10px' }} src={coinbase} alt="groupImg" />
              Coinbased Wallet Browser
            </ButtonOutlined>
          </Column>
          {/* </FormCard> */}
        </ContentWrapper>
      ) : (
        <ContentWrapper>
      
          {walletView === PromptView.options && (
            <>
              <ConnectionOptions onSelect={onSelect} />
            </>
          )}
          {walletView === PromptView.pending && <ConnectionLoader />}
          <AgreementNotice>
            By connecting a wallet, you agree to IX Swap’s
            <a href="https://ixswap.io/terms-and-conditions/" target="_blank" rel="noreferrer">
              {' '}
              Terms and Conditions
            </a>{' '}
            and acknowledge that you have read and understood the IX Swap
            <a href="https://ixswap.io/privacy-policy/" target="_blank" rel="noreferrer">
              {' '}
              Privacy Policy.
            </a>
          </AgreementNotice>
        </ContentWrapper>
      )}
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  background: ${(props) => props.theme.launchpad.colors.background};
  border-radius: 10px;
  padding: 2rem 2rem;
  position: relative;
`

const AgreementNotice = styled.div`
  background: ${(props) => props.theme.launchpad.colors.accent};
  color: rgba(102, 102, 255, 0.7);
  border-radius: 6px;
  border: 1px solid rgba(102, 102, 255, 0.3);
  padding: 1rem;

  ${text13}

  a {
    text-decoration: underline;
  }
`

const ExitIconContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.launchpad.colors.text.body};
  }
`
