import React from 'react'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { ReactComponent as QRCode } from 'v1/assets/qr.svg'
import { useSnackbar } from 'v2/hooks/useSnackbar'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digitalSecurities/router'
import { VSpacer } from 'v2/components/VSpacer'
import { Alert } from '@material-ui/lab'
import { useSetPageTitle } from 'v2/app/hooks/useSetPageTitle'

export const AssetView: React.FC = () => {
  const {
    params: { balanceId }
  } = useDSRouter()
  const { data, isLoading } = useAllBalances()
  const snackbar = useSnackbar()
  const asset = data.map[balanceId]
  const address = '12nfq3r45678900awn2noag3459an'
  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(address)
    snackbar.showSnackbar('Copied to clipboard', 'info')
  }

  useSetPageTitle(
    asset === undefined ? undefined : `${asset.name} (${asset.symbol})`
  )

  if (isLoading) {
    return null
  }

  return (
    <Box my={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Alert severity='warning'>
            Please only send {asset.symbol} to this address. We may not be able
            to recover if you transfer to the wrong address.
          </Alert>
        </Grid>
        <Grid container item xs={12} sm={8} direction='column' justify='center'>
          <Typography variant='h4'>
            <b>{asset.symbol} Address</b>
          </Typography>
          <Typography variant='body1' color='primary'>
            <b>{address}</b>
          </Typography>
          <VSpacer size='small' />
          <Button onClick={handleCopy} variant='contained' color='primary'>
            Copy Address
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <QRCode />
        </Grid>
      </Grid>
    </Box>
  )
}
