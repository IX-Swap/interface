// @flow
import React from 'react';
import { Box, Typography, TextField } from '@material-ui/core';

const OfferDetail = (
  {
    label,
    value,
    edit = false,
    name,
  }: {
    edit?: boolean,
    label: string,
    value: string,
    name?: string,
  },
  ref: any
) => (
  <Box py={2}>
    <Typography>
      <b>{label}</b>
    </Typography>
    <Box pt={1} />
    {!edit && <Typography>{value}</Typography>}
    {edit && <TextField inputRef={ref} name={name || ''} />}
  </Box>
);

export default React.forwardRef<any, any>(OfferDetail);
