import React from 'react';
import { RouteProps } from 'react-router-dom';
import { Typography, Grid, Box, Paper } from '@material-ui/core';
import { get } from 'lodash';

export default function Overview({ location }: RouteProps) {
  const { model, data } = location.state || {};

  if (!model || !data) return <span>nothing to display</span>;

  return (
    <Grid container component={Paper}>
      {(model || []).map((e) => (
        <Grid item key={e.key} xs={4}>
          {e.key && get(data, e.key) && (
            <Box p={4}>
              <Typography>
                <b>{e.label}</b>
              </Typography>
              <Typography>
                {e.render ? e.render(get(data, e.key)) : get(data, e.key)}
              </Typography>
            </Box>
          )}
        </Grid>
      ))}
    </Grid>
  );
}
