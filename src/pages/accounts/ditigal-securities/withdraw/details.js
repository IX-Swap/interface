import React from 'react'
import { Grid, Typography, Box, TextField } from '@material-ui/core'
import type { UserSecurityBalance } from 'context/balance/types'
import type { TransferDetails } from '../modules/types'

export default function WithdrawalDetailsInput ({
  asset,
  transferDetails,
  setTransferDetails
}: {
  asset: UserSecurityBalance,
  transferDetails: TransferDetails,
  setTransferDetails: (key: $Keys<TransferDetails>, value: string) => void,
}) {
  return (
    <Box my={3}>
      <Grid container spacing={3}>
        <Typography variant='caption'>
          <b>
            Please double check the address because we are unable to recover{' '}
            {asset.symbol} sent to a wrong address.
          </b>
        </Typography>
        <Grid item my={2} xs={12}>
          <TextField
            fullWidth
            value={transferDetails.recipientWallet}
            label={`Recipients ${asset.symbol} Address`}
            onChange={(ev) =>
              setTransferDetails('recipientWallet', ev.target.value)}
          />
        </Grid>
        <Grid item my={2} xs={12}>
          <TextField
            fullWidth
            value={transferDetails.amount}
            label='Amount'
            autoComplete='off'
            onChange={(ev) => setTransferDetails('amount', ev.target.value)}
          />
        </Grid>
        <Grid item my={2} xs={12}>
          <TextField
            fullWidth
            value={transferDetails.memo}
            label='Memo'
            onChange={(ev) => setTransferDetails('memo', ev.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
