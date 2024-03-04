import React, { useEffect, useState, useCallback } from 'react'
import { Trans } from '@lingui/macro'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import ReactGA from 'react-ga'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { AutoRow } from 'components/Row'
import { useWhitelabelState } from 'state/whitelabel/hooks'

import MetamaskIcon from '../../assets/images/metamask.png'
import { injected } from '../../connectors'
// import { OVERLAY_READY } from '../../connectors/Fortmatic'
import { SUPPORTED_WALLETS } from '../../constants/wallet'
import usePrevious from '../../hooks/usePrevious'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useWalletModalToggle } from '../../state/application/hooks'
import { ExternalLink, TYPE } from '../../theme'
import AccountDetails from '../AccountDetails'
import Modal from '../Modal'
import { ErrorSection } from './ErrorSection'
import Option from './Option'
import PendingView from './PendingView'
import Column from 'components/Column'

import metamaskmobile from 'assets/images/metamaskmobile.png'
import trust from 'assets/images/trust.png'
import coinbase from 'assets/images/coinbase.png'
// import { FormCard } from './styleds'
import {
  CloseColor,
  CloseIcon,
  ContentWrapper,
  HeaderRow,
  HoverText,
  OptionGrid,
  TermsCard,
  UpperSection,
  Wrapper,
} from './styleds'
import { ButtonIXSGradient, ButtonOutlined } from 'components/Button'

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName,
}: {
  pendingTransactions: string[] // hashes of pending
  confirmedTransactions: string[] // hashes of confirmed
  ENSName?: string
}) {
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error } = useWeb3React()

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>()

  const [pendingError, setPendingError] = useState<boolean>()

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()
  const { config } = useWhitelabelState()
  const previousAccount = usePrevious(account)

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen])

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [walletModalOpen])

  // close modal when a connection is successful
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)
  useEffect(() => {
    if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious])

  const tryActivation = useCallback(
    async (connector: AbstractConnector | undefined) => {
      let name = ''
      Object.keys(SUPPORTED_WALLETS).map((key) => {
        if (connector === SUPPORTED_WALLETS[key].connector) {
          return (name = SUPPORTED_WALLETS[key].name)
        }
        return true
      })
      // log selected wallet

      const { ym } = window
      ym(84960586, 'reachGoal', 'commonMetamaskChosenAsWallet')

      ReactGA.event({
        category: 'Wallet',
        action: 'Change Wallet',
        label: name,
      })
      setPendingWallet(connector) // set wallet for pending view
      setWalletView(WALLET_VIEWS.PENDING)

      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined
      }
      if (connector) {
        try {
          await activate(connector, undefined, true)
        } catch (error) {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector) // a little janky...can't use setError because the connector isn't set
          } else {
            activate(connector) // a little janky...can't use setError because the connector isn't set
            setPendingError(true)
          }
        }
      }
    },
    [activate]
  )

  function checkMetamaskAppInstalled() {
    // Check if the user agent indicates a mobile device
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
    // Define the Metamask app URL scheme
    const metamaskAppScheme = 'ethereum:'; // This is just a placeholder, the actual scheme might differ
  
    // Try to open the Metamask app URL scheme
    const testLink = document.createElement('a');
    testLink.href = metamaskAppScheme;
    const isMetamaskAppInstalled = isMobileDevice && (typeof testLink.href === 'string');
  
    return isMetamaskAppInstalled;
  }
  
  // Usage


  // useEffect(() => {
  //   const isWalletConnect = localStorage.getItem('walletconnect')
  //   if (isWalletConnect && isMobile && !account) {
  //     tryActivation(walletconnect)
  //   }
  // }, [account, tryActivation])

  // close wallet modal if fortmatic modal is active
  // useEffect(() => {
  //   fortmatic.on(OVERLAY_READY, () => {
  //     toggleWalletModal()
  //   })
  // }, [toggleWalletModal])

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    // const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    const isMetamaskAppInstalled = checkMetamaskAppInstalled();
  
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];
  
      if (isMobile && isMetamaskAppInstalled && option.name === 'MetaMask') {
        return (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              if (isMobile) {
                if (isMetamaskAppInstalled) {
                  // Open Metamask app
                  window.location.href = 'https://metamask.app.link/dapp/https://app.ixswap.io/#/kyc';
                } else {
                  // Handle the case where Metamask app is not installed
                  console.log('Metamask app is not installed');
                }
              } else {
                option.connector === connector
                  ? setWalletView(WALLET_VIEWS.ACCOUNT)
                  : !option.href && tryActivation(option.connector);
              }
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null}
            icon={option.iconURL}
          />
        );
      }
  
      return (
        <Option
          id={`connect-${key}`}
          onClick={() => {
            option.connector === connector
              ? setWalletView(WALLET_VIEWS.ACCOUNT)
              : !option.href && tryActivation(option.connector);
          }}
          key={key}
          active={option.connector === connector}
          color={option.color}
          link={option.href}
          header={option.name}
          subheader={null}
          icon={option.iconURL}
        />
      );
    });
  }
  




  
  function getModalContent() {
    if (error) {
      return <ErrorSection error={error} toggleWalletModal={toggleWalletModal} />
    }
    return (
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <HeaderRow color="blue">
            <HoverText
              onClick={() => {
                setPendingError(false)
                setWalletView(WALLET_VIEWS.ACCOUNT)
              }}
            >
              <Trans>Connect to a wallet</Trans>
            </HoverText>
          </HeaderRow>
        ) : (
          <HeaderRow>
            <HoverText>
              <Trans>Connect to a wallet</Trans>
            </HoverText>
          </HeaderRow>
        )}


          <ContentWrapper>
            <AutoRow style={{ flexWrap: 'nowrap' }}>
              <Text style={{ fontSize: '13px', color: '#666680', fontWeight: '400', lineHeight: '19.5px' }}>
                <Trans>
                  By connecting a wallet, you agree to {config?.name || 'IX Swap'}’s{' '}
                  <ExternalLink href="https://ixswap.io/terms-and-conditions/">Terms and Conditions</ExternalLink> and
                  acknowledge that you have read and understood the{' '}
                  <ExternalLink href="https://ixswap.io/privacy-policy/">
                    {config?.name || 'IX Swap'} Privacy Policy
                  </ExternalLink>
                  .
                </Trans>
              </Text>
            </AutoRow>
            {walletView === WALLET_VIEWS.PENDING ? (
              <PendingView
                connector={pendingWallet}
                error={pendingError}
                setPendingError={setPendingError}
                tryActivation={tryActivation}
              />
            ) : (
              <OptionGrid>{getOptions()}</OptionGrid>
            )}
          </ContentWrapper>
        
      </UpperSection>
    )
  }
  if (account && walletView === WALLET_VIEWS.ACCOUNT) {
    return (
      <RedesignedWideModal
        isOpen={walletModalOpen}
        onDismiss={toggleWalletModal}
        minHeight={70}
        maxHeight={70}
        mobileMaxHeight={80}
        isright
      >
        <Wrapper>
          {' '}
          <AccountDetails
            toggleWalletModal={toggleWalletModal}
            pendingTransactions={pendingTransactions}
            confirmedTransactions={confirmedTransactions}
            ENSName={ENSName}
            openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
          />
        </Wrapper>
      </RedesignedWideModal>
    )
  }
  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  )
}
