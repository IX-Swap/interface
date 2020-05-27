// @flow
import React from 'react';
import { Box, Typography } from '@material-ui/core';

const OfferDetail = ({ label, value }: { label: string, value: string }) => (
  <Box py={2}>
    <Typography>
      <b>{label}</b>
    </Typography>
    <Box pt={1} />
    <Typography>{value}</Typography>
  </Box>
);

export default OfferDetail;
