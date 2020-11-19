import React from 'react'
import { IconButton, Box } from '@material-ui/core'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { copyToClipboard } from 'v2/helpers/clipboard'
import { useSnackbar } from 'v2/hooks/useSnackbar'

export interface AddressFieldProps {
  val: string
}

export const AddressField = ({ val }: AddressFieldProps) => {
  const { showSnackbar } = useSnackbar()

  const copy = () => {
    copyToClipboard(val)
    showSnackbar('Copied!!')
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {val.slice(0, 4) + '...' + val.slice(val.length - 4)}
      <Box px={0.5} />
      <IconButton size='small' onClick={copy} style={{ fontSize: '18px' }}>
        <FileCopyOutlinedIcon fontSize='inherit' color='disabled' />
      </IconButton>
    </span>
  )
}
