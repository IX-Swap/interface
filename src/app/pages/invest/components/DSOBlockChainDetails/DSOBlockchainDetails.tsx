import React, { useState } from 'react'
import { FileCopyOutlined } from '@mui/icons-material'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import {
  AccountState,
  useMetamaskWalletState
} from 'app/pages/invest/hooks/useMetamaskWalletState'
import WalletModal from 'components/WalletModal/WalletModal'
import {
  ALL_SUPPORTED_CHAIN_IDS,
  CHAIN_INFO
} from 'config/blockchain/constants'
import { shortenAddress } from 'helpers/blockchain'
import { copyToClipboard } from 'helpers/clipboard'
import { isTruthy } from 'helpers/strings'
import { useAddTokenToMetamask } from 'hooks/blockchain/useAddTokenToMetamask'
import { useSwitchChain } from 'hooks/blockchain/useSwitchChain'
import { DigitalSecurityOffering } from 'types/dso'
import { useStyles } from './DSOBlockainDetails.styles'
import { ReactComponent as AddToWalletIcon } from 'assets/icons/add-tokens-to-wallet.svg'
import { ReactComponent as AddToWalletHoverIcon } from 'assets/icons/add-tokens-to-wallet-hover.svg'

export interface DSOBlockchainDetailsProps {
  dso: DigitalSecurityOffering
}

export const DSOBlockchainDetails = ({ dso }: DSOBlockchainDetailsProps) => {
  const [isOpen, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!isOpen)
  const classes = useStyles()
  const address = dso?.deploymentInfo?.token
  const dsoChainId = dso?.network?.chainId
  const { addToken } = useAddTokenToMetamask({
    token: dso.deploymentInfo
  })
  const { switchChain } = useSwitchChain()
  const { accountState } = useMetamaskWalletState({
    tokenChainId: dsoChainId as number
  })

  const info = CHAIN_INFO[dsoChainId as number]

  const callbackMap = {
    [AccountState.NOT_CONNECTED]: () => setOpen(true),
    [AccountState.DIFFERENT_CHAIN]: () => switchChain(dsoChainId),
    [AccountState.SAME_CHAIN]: async () => await addToken()
  }
  const messageMap = {
    [AccountState.NOT_CONNECTED]: `To add token first connect to wallet`,
    [AccountState.DIFFERENT_CHAIN]: `Please connect to ${info?.chainName} to add token in your wallet`,
    [AccountState.SAME_CHAIN]: 'Add to wallet'
  }
  const hideComponent =
    !isTruthy(address) ||
    !isTruthy(info) ||
    !ALL_SUPPORTED_CHAIN_IDS.includes(dsoChainId as number)

  const [isHovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  if (hideComponent) {
    return null
  }
  const chainButton = (
    <IconButton size='small' onClick={() => switchChain(dsoChainId)}>
      <img src={info.logoUrl} alt={'Icon'} className={classes.chainLogo} />
    </IconButton>
  )

  return (
    <Box className={classes.root}>
      <Box className={classes.addressBox}>
        <Tooltip
          title={`Switch to ${info?.chainName}`}
          aria-label={`switch-chain`}
          arrow
        >
          {chainButton}
        </Tooltip>
        <Typography className={classes.address}>
          {shortenAddress(address, 8)}
        </Typography>

        <IconButton size='small' onClick={() => copyToClipboard(address ?? '')}>
          <FileCopyOutlined color='action' />
        </IconButton>
      </Box>
      {dso?.investable ? (
        <Tooltip
          title={messageMap[accountState]}
          aria-label={`add-to-metamask`}
          arrow
        >
          <IconButton
            className={classes.addToWalletButton}
            onClick={async () => await callbackMap[accountState]()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {!isHovered ? (
              <AddToWalletIcon width={28} height={28} />
            ) : (
              <AddToWalletHoverIcon width={28} height={28} />
            )}
          </IconButton>
        </Tooltip>
      ) : (
        ''
      )}

      <WalletModal isOpen={isOpen} toggleModal={toggleOpen} />
    </Box>
  )
}
