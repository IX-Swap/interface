// @flow
import React from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  logo: {
    width: '50px',
    height: '50px',
    borderRadius: '50px',
    backgroundColor: '#f0f0f0',
  },
}));

const DsoTitle = ({
  tokenSymbol,
  issuerName,
}: {
  tokenSymbol: string,
  issuerName: string,
}) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Box mr={2}>
        <div className={classes.logo} />
      </Box>
      <Grid item>
        <Typography variant="h4">
          <b>{tokenSymbol}</b>
        </Typography>
        <Typography>{issuerName}</Typography>
      </Grid>
    </Grid>
  );
};

export default DsoTitle;
