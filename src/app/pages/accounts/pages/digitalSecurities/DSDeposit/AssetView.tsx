import React from 'react'
import { useParams } from 'react-router-dom'
import { useAllBalances } from 'hooks/balance/useAllBalances'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { ReactComponent as QRCode } from 'assets/qr.svg'
import { useSnackbar } from 'hooks/useSnackbar'
import { VSpacer } from 'components/VSpacer'
import { Alert } from '@material-ui/lab'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { privateClassNames } from 'helpers/classnames'

export const AssetView: React.FC = () => {
  const { data, isLoading } = useAllBalances()
  const snackbar = useSnackbar()
  const params = useParams<{ balanceId: string }>()
  const asset = data.map[params.balanceId]
  const address = '12nfq3r45678900awn2noag3459an'
  const handleCopy = async () => {
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
        <Grid
          container
          item
          xs={12}
          sm={8}
          direction='column'
          justify='center'
          className={privateClassNames()}
        >
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
        <Grid item xs={12} sm={4} className={privateClassNames()}>
          <QRCode />
        </Grid>
      </Grid>
    </Box>
  )
}
