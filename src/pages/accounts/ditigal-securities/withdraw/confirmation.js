import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import type { TransferDetails, UserSecurityBalance } from '../modules/types';

const BoldTypography = ({ children }: { children: Node }) => (
  <Typography>
    <b>{children}</b>
  </Typography>
);

const DSWithdrawalConfirmation = ({
  transferDetails,
  asset,
}: {
  transferDetails: TransferDetails,
  asset: UserSecurityBalance,
}) => (
  <Grid container>
    <Grid item container direction="column" justify="flex-end" mb={2}>
      <Typography align="right">{transferDetails.date}</Typography>
    </Grid>

    <Grid item container direction="column" xs={12}>
      <Box my={3}>
        <BoldTypography>Name of Token</BoldTypography>
        <Typography>{asset.name}</Typography>
      </Box>
    </Grid>

    <Grid item container direction="column" xs={6}>
      <BoldTypography>Withdrawal Amount</BoldTypography>
      <Typography>
        {transferDetails.amount} {asset.symbol}
      </Typography>
    </Grid>

    <Grid item container direction="column" xs={6}>
      <BoldTypography>Memo</BoldTypography>
      <Typography>{transferDetails.memo}</Typography>
    </Grid>
  </Grid>
);

export default DSWithdrawalConfirmation;
