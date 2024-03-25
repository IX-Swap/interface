import { useEffect, useState, useCallback } from 'react'
import { Trans } from '@lingui/macro'
import { Connector } from '@web3-react/types'
import { useWeb3React } from '@web3-react/core'
import ReactGA from 'react-ga'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { AutoRow } from 'components/Row'
import { useWhitelabelState } from 'state/whitelabel/hooks'

import MetamaskIcon from '../../assets/images/metamask.png'
import { metaMask } from '../../connectors/metaMask'
// import { OVERLAY_READY } from '../../connectors/Fortmatic'
import { SUPPORTED_WALLETS } from '../../constants/wallet'
import usePrevious from '../../hooks/usePrevious'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useWalletModalToggle } from '../../state/application/hooks'
import { ExternalLink } from '../../theme'
import AccountDetails from '../AccountDetails'
import Modal from '../Modal'
import Option from './Option'
import PendingView from './PendingView'
import {
  CloseColor,
  CloseIcon,
  ContentWrapper,
  HeaderRow,
  HoverText,
  OptionGrid,
  UpperSection,
  Wrapper,
} from './styleds'
import { ReactComponent as TooltipIcon } from 'assets/images/infoBlue.svg'
import { Line } from 'components/Line'
import metamaskmobile from 'assets/images/metamaskmobile.png'
import trust from 'assets/images/trust.png'
import coinbase from 'assets/images/coinbase.png'

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
  const { account, connector, isActive } = useWeb3React()

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const [pendingWallet, setPendingWallet] = useState<Connector | undefined>()

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
  const activePrevious = usePrevious(isActive)
  const connectorPrevious = usePrevious(connector)
  useEffect(() => {
    if (walletModalOpen && ((isActive && !activePrevious) || (connector && connector !== connectorPrevious))) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [setWalletView, isActive, connector, walletModalOpen, activePrevious, connectorPrevious])

  // Adjust tryActivation() function to handle Coinbase Wallet activation
  const tryActivation = useCallback(
    async (connector: Connector | undefined) => {
      let name = ''
      Object.keys(SUPPORTED_WALLETS).map((key) => {
        if (connector === SUPPORTED_WALLETS[key].connector) {
          return (name = SUPPORTED_WALLETS[key].name)
        }
        return true
      })

      const { ym } = window
      ym(84960586, 'reachGoal', 'commonMetamaskChosenAsWallet')

      ReactGA.event({
        category: 'Wallet',
        action: 'Change Wallet',
        label: name,
      })
      setPendingWallet(connector)
      setWalletView(WALLET_VIEWS.PENDING)

      if (connector) {
        try {
          await connector.activate()
        } catch (error) {
          connector.activate() // a little janky...can't use setError because the connector isn't set
          setPendingError(true)
        }
      }
    },
    [isActive]
  )

  function checkMetamaskAppInstalled() {
    // Check if the user agent indicates a mobile device
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    // Define the Metamask app URL scheme
    const metamaskAppScheme = 'ethereum:' // This is just a placeholder, the actual scheme might differ

    // Try to open the Metamask app URL scheme
    const testLink = document.createElement('a')
    testLink.href = metamaskAppScheme
    const isMetamaskAppInstalled = isMobileDevice && typeof testLink.href === 'string'

    return isMetamaskAppInstalled
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

  // Update getOptions() function to handle Coinbase Wallet
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask

    const isMetamaskAppInstalled = checkMetamaskAppInstalled()

    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key]

      if (isMobile && isMetamaskAppInstalled && option.name === 'MetaMask') {
        return (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              // if (isMobile) {
              //   if (isMetamaskAppInstalled) {
              //     window.location.href = 'https://metamask.app.link/dapp/https://app.ixswap.io/#/kyc'
              //   } else {
              //     console.log('Metamask app is not installed')
              //   }
              // } else {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector)
              // }
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null}
            icon={option.iconURL}
          />
        )
      }
      //   if (!window.web3 && !window.ethereum && option.mobile) {
      //     return (
      //       <Option
      //         onClick={() => {
      //           option.connector !== connector && !option.href && tryActivation(option.connector)
      //         }}
      //         id={`connect-${key}`}
      //         key={key}
      //         active={option.connector && option.connector === connector}
      //         color={option.color}
      //         link={option.href}
      //         header={option.name}
      //         subheader={null}
      //         icon={option.iconURL}
      //       />
      //     )
      //   }
      //   return null
      // }

      // overwrite injected when needed
      if (option.connector === metaMask) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color={'#E8831D'}
                header={<Trans>Install Metamask</Trans>}
                subheader={null}
                link={'https://metamask.io/'}
                icon={MetamaskIcon}
              />
            )
          } else {
            return null //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }

      // Handle Coinbase Wallet option
      else if (isMobile && option.name === 'Coinbase Wallet') {
        return (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              if (isMetamaskAppInstalled) {
                // Open Coinbase Wallet app
                window.location.href = 'coinbasewallet://crypto?_a=connect&url=https://app.ixswap.io/#/kyc'
              } else {
                // Handle the case where Coinbase Wallet app is not installed
                console.log('Coinbase Wallet app is not installed')
              }
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null}
            icon={coinbase} // Use the Coinbase Wallet icon here
          />
        )
      } else {
        // Handle other wallet options
        return (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector)
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null}
            icon={option.iconURL}
          />
        )
      }
    })
  }

  function getModalContent() {
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
                Connecting your wallet allows IX Swap to see your wallet address and, consequently, the funds you hold
                on the blockchain. This does not grant IX Swap the ability to manage or transfer your tokens; for that,
                you will be asked to sign a token approval.
                {/* By connecting a wallet, you agree to {config?.name || 'IX Swap'}’s{' '}
                  <ExternalLink href="https://ixswap.io/terms-and-conditions/">Terms and Conditions</ExternalLink> and
                  acknowledge that you have read and understood the{' '}
                  <ExternalLink href="https://ixswap.io/privacy-policy/">
                    {config?.name || 'IX Swap'} Privacy Policy
                  </ExternalLink>
                  . */}
              </Trans>
              <br /> <br />
              <Trans>Select your wallet from the options below to get started</Trans>
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
          {' '}
          <div style={{ fontSize: '13px', color: '#6666FF', fontWeight: '600', textAlign: 'center' }}>
            I do not have a wallet yet
          </div>
          <TooltipIcon />
        </div>
        <Line style={{ marginTop: '70px' }} />

        <div style={{ fontSize: '13px', justifyContent: 'center', marginTop: '20px', color: '#666680' }}>
          By connecting a wallet, you agree to {config?.name || 'IX Swap'}’s{' '}
          <ExternalLink style={{ color: '#6666FF' }} href="https://ixswap.io/terms-and-conditions/">
            Terms and Conditions
          </ExternalLink>{' '}
          and acknowledge that you have read and understood the{' '}
          <ExternalLink style={{ color: '#6666FF' }} href="https://ixswap.io/privacy-policy/">
            {config?.name || 'IX Swap'} Privacy Policy
          </ExternalLink>
          .
        </div>
      </UpperSection>
    )
  }
  if (account && walletView === WALLET_VIEWS.ACCOUNT) {
    return (
      <RedesignedWideModal
        isOpen={walletModalOpen}
        onDismiss={toggleWalletModal}
        // minHeight={60}
        // maxHeight={50}
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
