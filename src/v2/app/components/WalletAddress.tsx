import React from 'react'
import { IconButton, Box } from '@material-ui/core'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { copyToClipboard } from 'v2/helpers/clipboard'
import { useSnackbar } from 'v2/hooks/useSnackbar'
import { AppRouterLink } from 'v2/components/AppRouterLink'

export interface WalletAddressProps {
  val: string
  link?: boolean
}

export const WalletAddress = ({ val, link = false }: WalletAddressProps) => {
  const { showSnackbar } = useSnackbar()

  const copy = () => {
    copyToClipboard(val)
    showSnackbar('Copied!!')
  }
  const url = `https://etherscan.io/address/${val}`
  const textContent = val.slice(0, 4) + '...' + val.slice(val.length - 4)

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
      <IconButton size='small' onClick={copy} style={{ fontSize: '18px' }}>
        <FileCopyOutlinedIcon fontSize='inherit' color='disabled' />
      </IconButton>
    </span>
  )
}
