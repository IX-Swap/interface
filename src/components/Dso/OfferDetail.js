// @flow
import React from 'react';
import { Box, Typography, TextField } from '@material-ui/core';

const OfferDetail = ({
  label,
  value,
  edit = false,
  raw,
}: {
  edit?: boolean,
  label: string,
  value: string,
  raw?: string,
}) => (
  <Box py={2}>
    <Typography>
      <b>{label}</b>
    </Typography>
    <Box pt={1} />
    {!edit && <Typography>{value}</Typography>}
    {edit && <TextField value={raw || value} />}
  </Box>
);

export default OfferDetail;
