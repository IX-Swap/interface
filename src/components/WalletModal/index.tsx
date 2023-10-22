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
import { ExternalLink, TYPE } from '../../theme'
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
  TermsCard,
  UpperSection,
  Wrapper,
} from './styleds'

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

  const tryActivation = useCallback(
    async (connector: Connector | undefined) => {
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
    const isMetamask = window.ethereum && window.ethereum.isMetaMask
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key]
      // check for mobile options
      // if (isMobile) {
      //   //disable portis on mobile for now
      //   // if (option.connector === portis) {
      //   //   return null
      //   // }

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

      // return rest of options
      return (
        // !isMobile &&
        // !option.mobileOnly && (
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
          subheader={null} //use option.descriptio to bring back multi-line
          icon={option.iconURL}
        />
        // )
      )
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
          {/* <TermsCard style={{ marginBottom: '16px' }}>  */}
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
          {/* </TermsCard> */}
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
        minHeight={60}
        maxHeight={50}
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
