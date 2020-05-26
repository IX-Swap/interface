import React from 'react';
import { Grid, Button, Typography, Box } from '@material-ui/core';
import { snackbarService } from 'uno-material-ui';
import type { UserSecurityBalance } from 'context/balance/types';

import { ReactComponent as QRCode } from './qr.svg';

export default function AssetDetails({
  asset,
}: {
  asset: UserSecurityBalance,
}) {
  const address = '12nfq3r45678900awn2noag3459an';

  return (
    <Box my={3}>
      <Grid container spacing={3}>
        <Grid container item xs={12} sm={8} direction="column" justify="center">
          <Typography variant="h4">
            <b>{asset.symbol} Address</b>
          </Typography>
          <Typography variant="body1" color="primary">
            <b>{address}</b>
          </Typography>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(address);
              snackbarService.showSnackbar("Copied to clipboard", "info");
            }}
          >
            Copy Address
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <QRCode />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Be careful</Typography>
          <Typography variant="subtitle2">
            Please only send {asset.symbol} to this address. We may not be able
            to recover if you transfer to the wrong address.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
