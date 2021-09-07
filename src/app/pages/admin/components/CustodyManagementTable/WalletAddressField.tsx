import React from 'react'
import { Grid, IconButton } from '@material-ui/core'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { useServices } from 'hooks/useServices'

export interface WalletAddressFieldProps {
  address: string
}

export const WalletAddressField = ({ address }: WalletAddressFieldProps) => {
  const { snackbarService } = useServices()
  const firstPart = address.slice(0, 4)
  const secondPart = '...'
  const thirdPart = address.slice(address.length - 4, address.length)
  const result = firstPart.concat(secondPart, thirdPart)

  const handleClick = async () => {
    await navigator.clipboard.writeText(address)
    snackbarService.showSnackbar('Copied!', 'success')
  }

  return (
    <Grid container alignItems={'center'}>
      <Grid item>{result}</Grid>
      <Grid item>
        <IconButton onClick={handleClick}>
          <FileCopyOutlinedIcon style={{ color: '#AAAAAA' }} />
        </IconButton>
      </Grid>
    </Grid>
  )
}
