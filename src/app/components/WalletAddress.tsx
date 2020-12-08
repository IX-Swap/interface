import React from 'react'
import { IconButton, Box } from '@material-ui/core'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { copyToClipboard } from 'helpers/clipboard'
import { useSnackbar } from 'hooks/useSnackbar'
import { AppRouterLink } from 'components/AppRouterLink'
import { Network } from 'types/networks'

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
    showSnackbar('Copied!!')
  }

  const url =
    network?.explorer.urls.address ?? 'https://ropsten.etherscan.io/address/%s'

  const textContent = `${address.slice(0, 4)}...${address.slice(
    address.length - 4
  )}`

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {link ? (
        <AppRouterLink
          target='_blank'
          to={url.replace(/%s/g, address)}
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
