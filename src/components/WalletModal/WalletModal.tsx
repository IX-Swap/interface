/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid
} from '@mui/material'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import MetamaskIcon from 'assets/images/metamask.svg'
import useStyles from 'components/WalletModal/WalletModal.styles'
import { injected } from 'config/blockchain/connectors'
import {
  SUPPORTED_WALLETS,
  WalletInfo
} from 'config/blockchain/supportedWallets'
import React, { useCallback, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { ErrorSection } from './ErrorSection'
import usePrevious from './hooks/usePrevious'
import Option from './Option'
import PendingView from './PendingView'
import { WALLET_VIEWS } from './walletViews'

export interface WalletModalProps {
  isOpen: boolean
  toggleModal: () => void
}

export default function WalletModal({ isOpen, toggleModal }: WalletModalProps) {
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error } = useWeb3React()
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)
  const classes = useStyles()
  const [pendingWallet, setPendingWallet] = useState<
    AbstractConnector | undefined
  >()

  const [pendingError, setPendingError] = useState<boolean>()

  const previousAccount = usePrevious(account)

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && isOpen) {
      toggleModal()
    }
  }, [account, previousAccount, toggleModal, isOpen])

  // always reset to account view
  useEffect(() => {
    if (isOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [isOpen])

  // close modal when a connection is successful
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)

  useEffect(() => {
    if (
      isOpen &&
      ((active && !activePrevious) ||
        (connector != null &&
          connector !== undefined &&
          connector !== connectorPrevious &&
          error !== null &&
          error !== undefined))
    ) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [
    setWalletView,
    active,
    error,
    connector,
    isOpen,
    activePrevious,
    connectorPrevious
  ])

  const tryActivation = useCallback(
    async (connector: AbstractConnector | undefined) => {
      setPendingWallet(connector) // set wallet for pending view
      setWalletView(WALLET_VIEWS.PENDING)

      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (
        connector instanceof WalletConnectConnector &&
        connector.walletConnectProvider?.wc?.uri
      ) {
        connector.walletConnectProvider = undefined
      }
      if (connector != null && connector !== undefined) {
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

  function renderMobileOption(option: WalletInfo, key: string) {
    if (!window.web3 && !window.ethereum && option.mobile) {
      return (
        <Option
          onClick={() => {
            option.connector !== connector &&
              !option.href &&
              tryActivation(option.connector)
          }}
          id={`connect-${key}`}
          key={key}
          active={option.connector && option.connector === connector}
          link={option.href}
          header={option.name}
          subheader={null}
          icon={option.iconURL}
        />
      )
    }
    return null
  }

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key]
      // check for mobile options
      if (isMobile) {
        return renderMobileOption(option, key)
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        const isMetamask = Boolean(window?.ethereum?.isMetaMask)

        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                header='Install Metamask'
                subheader={null}
                link='https://metamask.io/'
                icon={MetamaskIcon}
              />
            )
          } else {
            return null
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

      return (
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector)
            }}
            key={key}
            active={option.connector === connector}
            link={option.href}
            header={option.name}
            subheader={null}
            icon={option.iconURL}
          />
        )
      )
    })
  }

  function getModalContent() {
    if (error !== null && error !== undefined) {
      return <ErrorSection error={error} toggleWalletModal={toggleModal} />
    }
    return (
      <Grid>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
          {/* <IconButton aria-label='close' size='large'> */}
          <CloseIcon onClick={toggleModal} />
          {/* </IconButton> */}
        </Box>

        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <Button
            onClick={() => {
              setPendingError(false)
              setWalletView(WALLET_VIEWS.ACCOUNT)
            }}
          >
            Back
          </Button>
        ) : (
          <DialogTitle className={classes.title}>Connect Wallet</DialogTitle>
        )}

        <Grid mt={4}>
          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          ) : (
            <Grid container direction='column'>
              {getOptions()}
            </Grid>
          )}
        </Grid>
      </Grid>
    )
  }
  if (account) {
    return null
  }
  return (
    <Dialog fullWidth open={isOpen} onClose={toggleModal}>
      <DialogContent className={classes.contentWrapper}>
        {getModalContent()}
      </DialogContent>
    </Dialog>
  )
}
