import React from 'react'
import { IconButton, Box } from '@material-ui/core'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { copyToClipboard } from 'helpers/clipboard'
import { useSnackbar } from 'hooks/useSnackbar'
import { AppRouterLink } from 'components/AppRouterLink'

export interface WalletAddressProps {
  address: string
  link?: boolean
}

export const WalletAddress = ({
  address,
  link = false
}: WalletAddressProps) => {
  const { showSnackbar } = useSnackbar()
  const handleCopy = () => {
    copyToClipboard(address)
    showSnackbar('Copied!!')
  }
  const url = `https://ropsten.etherscan.io/address/${address}`
  const textContent = `${address.slice(0, 4)}...${address.slice(
    address.length - 4
  )}`

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {link ? (
        <AppRouterLink
          target='_blank'
          to={url}
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
