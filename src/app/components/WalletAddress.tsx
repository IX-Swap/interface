import React from 'react'
import { IconButton, Box } from '@material-ui/core'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { copyToClipboard } from 'helpers/clipboard'
import { useSnackbar } from 'hooks/useSnackbar'
import { AppRouterLink } from 'components/AppRouterLink'
import { Network } from 'types/networks'
import { getBlockchainUrl } from 'app/components/DSO/utils'
import { NoOverflowText } from 'app/components/NoOverflowText'

export interface WalletAddressProps {
  address: string
  link?: boolean
  network?: Network
}

export const WalletAddress = ({
  address,
  network,
  link = false
}: WalletAddressProps) => {
  const { showSnackbar } = useSnackbar()
  const handleCopy = () => {
    copyToClipboard(address)
    showSnackbar('Copied!')
  }

  const addressUrl = getBlockchainUrl(address, network, 'address')

  if (address === '') {
    return null
  }

  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center', maxWidth: '100%' }}
    >
      {link ? (
        <AppRouterLink
          target='_blank'
          to={addressUrl}
          underline='always'
          color='primary'
        >
          <NoOverflowText text={address} />
        </AppRouterLink>
      ) : (
        <NoOverflowText text={address} />
      )}
      <Box px={0.5} />
      <IconButton
        size='small'
        onClick={handleCopy}
        style={{ fontSize: '18px' }}
      >
        <FileCopyOutlinedIcon fontSize='inherit' color='disabled' />
      </IconButton>
    </span>
  )
}
