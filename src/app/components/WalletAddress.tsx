import React from 'react'
import { IconButton, Box } from '@mui/material'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import { copyToClipboard } from 'helpers/clipboard'
import { useSnackbar } from 'hooks/useSnackbar'
import { AppRouterLink } from 'components/AppRouterLink'
import { Network } from 'types/networks'
import { getBlockchainUrl } from 'app/components/DSO/utils'

export interface WalletAddressProps {
  address: string
  link?: boolean
  network?: Network
  long?: boolean
}

export const WalletAddress = ({
  address,
  network,
  link = false,
  long = false
}: WalletAddressProps) => {
  const { showSnackbar } = useSnackbar()
  const handleCopy = () => {
    copyToClipboard(address)
    showSnackbar('Copied!')
  }

  const addressUrl = getBlockchainUrl(address, network, 'address')

  const textContent = long
    ? address
    : `${address.slice(0, 4)}...${address.slice(address.length - 4)}`

  if (address === '') {
    return null
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {link ? (
        <AppRouterLink
          target='_blank'
          to={addressUrl}
          underline='always'
          color='primary'
        >
          {textContent}
        </AppRouterLink>
      ) : (
        textContent
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
