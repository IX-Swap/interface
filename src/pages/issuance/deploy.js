// @flow
import React, { useState, useEffect } from 'react';
import { RouteProps } from 'react-router-dom';

import moment from 'moment';
import io from 'socket.io-client';
import { API_URL } from 'config';
import {
  Paper,
  Grid,
  TextField,
  Container,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import { ButtonWithLoading } from 'uno-material-ui';

import localStore from 'services/storageHelper';

import type { Dso } from 'context/dso/types';
import { getDso, deployDso } from './modules/actions';

const useDeployLogic = (id: string) => {
  // $FlowFixMe
  const [dso, setDso] = useState<Dso>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<string>>([]);
  const bearerToken = localStore.getAccessToken();
  let socket;
  if (bearerToken) {
    socket = io(`${API_URL}?token=${bearerToken}`);
  }

  const listener = (data) => {
    if (!window[`deploy_message_${id}`]) {
      window[`deploy_message_${id}`] = [];
    }

    window[`deploy_message_${id}`].push(
      `[${moment().format('MM/DD/YYYY hh:mm:ss a')}] ${data}`
    );

    if (data.toLowerCase() === 'ok') {
      ((mId) => {
        setTimeout(async () => {
          socket.removeEventListener(`x-token/${id}`);
          const newDso = await getDso(mId);
          if (newDso) {
            setDso(newDso);
          }

          setLoading(false);
        }, 500);
      })(id);
    }

    setMessages(window[`deploy_message_${id}`]);
  };

  const deploy = async () => {
    setLoading(true);
    const newDso = await deployDso(dso._id);

    if (newDso) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!socket || !id) return;

    if (socket.hasListeners(`x-token/${id}`)) {
      socket.removeEventListener(`x-token/${id}`);
    }

    socket.on(`x-token/${id}`, listener);
  }, [id]); // eslint-disable-line

  useEffect(() => {
    (async (mId) => {
      const mDso = await getDso(mId);
      if (mDso) {
        setDso(mDso);
      }
    })(id);
  }, [id]);

  return {
    dso,
    messages,
    deploy,
    loading,
  };
};

const Deploy = ({ match }: RouteProps) => {
  const {
    params: { id },
  } = match;
  const { dso, messages, loading, deploy } = useDeployLogic(id);

  return dso ? (
    <Container>
      <Typography variant="h3">Deploy X-Token</Typography>
      <Box my={4}>
        <Grid container spacing={4} component={Paper} style={{ padding: 16 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              value={dso.tokenName || ''}
              disabled
              label="Token Name"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              value={dso.tokenSymbol || ''}
              disabled
              label="Token Symbol"
            />
          </Grid>

          {!dso.deploymentInfo && !dso.policyBuilder && (
            <Grid item xs={12} container justify="center">
              <ButtonWithLoading
                isFetching={loading}
                onClick={() => deploy()}
                disableElevation
                variant="contained"
                color="primary"
              >
                Deploy
              </ButtonWithLoading>

              {
                // for some reason, uno-material-ui doesn't get button css without this
              }
              <Button style={{ display: 'none' }}>&nbsp;</Button>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box my={4}>
        <Grid container>
          <Grid item xs={12} component={Paper}>
            <TextField
              id="outlined-multiline-static"
              label="Message"
              multiline
              fullWidth
              value={messages.length ? messages.join('\n') : ''}
              disabled
              rows={12}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  ) : (
    <span>loading</span>
  );
};

export default Deploy;
