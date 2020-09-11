import React from 'react'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'
import { useParams } from 'react-router-dom'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { ReactComponent as QRCode } from 'v1/assets/qr.svg'
import { useSnackbar } from 'v2/hooks/useSnackbar'

export const AssetView: React.FC = () => {
  const { balanceId } = useParams<{ balanceId: string }>()
  const { data } = useAllBalances()
  const snackbar = useSnackbar()
  const asset = data.map[balanceId]
  const address = '12nfq3r45678900awn2noag3459an'
  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(address)
    await snackbar.showSnackbar('Copied to clipboard', 'info')
  }

  return (
    <Box my={3}>
      <Grid container spacing={3}>
        <Grid container item xs={12} sm={8} direction='column' justify='center'>
          <Typography variant='h4'>
            <b>{asset.symbol} Address</b>
          </Typography>
          <Typography variant='body1' color='primary'>
            <b>{address}</b>
          </Typography>
          <Button onClick={handleCopy}>Copy Address</Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <QRCode />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Be careful</Typography>
          <Typography variant='subtitle2'>
            Please only send {asset.symbol} to this address. We may not be able
            to recover if you transfer to the wrong address.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
