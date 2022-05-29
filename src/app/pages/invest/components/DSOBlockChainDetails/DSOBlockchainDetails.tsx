import { FileCopyOutlined } from '@mui/icons-material'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import {
  AccountState,
  useMetamaskWalletState
} from 'app/pages/invest/hooks/useMetamaskWalletState'
import MetamaskIcon from 'assets/images/metamask.svg'
import WalletModal from 'components/WalletModal/WalletModal'
import {
  ALL_SUPPORTED_CHAIN_IDS,
  CHAIN_INFO
} from 'config/blockchain/constants'
import { shortenAddress } from 'helpers/blockchain'
import { copyToClipboard } from 'helpers/clipboard'
import { isTruthy } from 'helpers/strings'
import { useAddTokenToMetamask } from 'hooks/blockchain/useAddTokenToMetamask'
import useSwitchChain from 'hooks/blockchain/useSwitchChain'
import React, { useState } from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { useStyles } from './DSOBlockainDetails.styles'

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

  const metamaskCallbackMap = {
    [AccountState.NOT_CONNECTED]: () => setOpen(true),
    [AccountState.DIFFERENT_CHAIN]: () => switchChain(dsoChainId),
    [AccountState.SAME_CHAIN]: async () => await addToken()
  }
  const metamaskMessageMap = {
    [AccountState.NOT_CONNECTED]: `To add token first connect to Metamask`,
    [AccountState.DIFFERENT_CHAIN]: `Please connect to ${info.chainName} to add token in Your Metamask wallet`,
    [AccountState.SAME_CHAIN]: 'Add to Metamask'
  }
  const hideComponent =
    !isTruthy(address) ||
    !isTruthy(info) ||
    !ALL_SUPPORTED_CHAIN_IDS.includes(dsoChainId as number)

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
      <Tooltip
        title={`Switch to ${info.chainName}`}
        aria-label={`switch-chain`}
        arrow
      >
        {chainButton}
      </Tooltip>
      <Typography className={classes.address}>
        {shortenAddress(address)}
      </Typography>

      <IconButton size='small' onClick={() => copyToClipboard(address ?? '')}>
        <FileCopyOutlined color='action' />
      </IconButton>
      <Tooltip
        title={metamaskMessageMap[accountState]}
        aria-label={`add-to-metamask`}
        arrow
      >
        <Box>
          <IconButton
            size='small'
            onClick={async () => await metamaskCallbackMap[accountState]()}
          >
            <img src={MetamaskIcon} alt={'Icon'} />
          </IconButton>
        </Box>
      </Tooltip>
      <WalletModal isOpen={isOpen} toggleModal={toggleOpen} />
    </Box>
  )
}
