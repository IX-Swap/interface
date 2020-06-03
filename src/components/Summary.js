import React from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Typography, Grid, Box, Paper, Button } from '@material-ui/core';
import { get } from 'lodash';

export default function Overview({ location, hasBack }: RouteProps) {
  const { model, data } = location.state || {};
  const history = useHistory();

  if (!model || !data) return <span>nothing to display</span>;

  return (
    <>
      {hasBack && (
        <Box py={4} px={2}>
          <Grid container item xs={12} alignItems="center">
            <Grid item>
              <Button type="button" onClick={() => history.goBack()}>
                <ArrowBackIosIcon />
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="h3">Information</Typography>
            </Grid>
          </Grid>
        </Box>
      )}
      <Grid container>
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
    </>
  );
}
