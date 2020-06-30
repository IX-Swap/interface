// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import { RouteProps } from 'react-router-dom'

import moment from 'moment'
import {
  Paper,
  Grid,
  TextField,
  Container,
  Box,
  Typography,
  Button
} from '@material-ui/core'
import { ButtonWithLoading } from 'uno-material-ui'

import localStore from 'services/storageHelper'
import { subscribeToSocket } from 'services/socket'

import type { Dso } from 'context/dso/types'
import { getDso } from './modules/actions'

const useDeployLogic = (userId: string, id: string) => {
  // $FlowFixMe
  const [dso, setDso] = useState<Dso>({})
  const [loading, setLoading] = useState<boolean>(false)
  const messages = useRef([])
  const bearerToken = localStore.getAccessToken()
  let socket
  if (bearerToken) {
    socket = subscribeToSocket()
  }

  const listener = (data) => {
    let date = moment().format('MM/DD/YYYY hh:mm:ss a')
    let message = data
    if (!window[`deploy_message_${id}`]) {
      window[`deploy_message_${id}`] = []
    }

    if (data.at) {
      date = moment(data.at).format('MM/DD/YYYY hh:mm:ss a')
      message = data.message
    }

    if (message.toLowerCase().includes('deploying')) {
      setLoading(true)
    }

    window[`deploy_message_${id}`].push(
      `[${date}] ${message}`
    )

    if (message.toLowerCase() === 'ok') {
      ((mId) => {
        setTimeout(async () => {
          socket.removeEventListener(`x-token/${id}`)
          const newDso = await getDso(userId, mId)
          if (newDso) {
            setDso(newDso)
          }

          setLoading(false)
        }, 500)
      })(id)
    }

    messages.current = window[`deploy_message_${id}`]
  }

  const deploy = async () => {
    setLoading(true)
    socket.emit('x-token/deploy/begin', id)
  }

  useEffect(() => {
    if (!socket || !id) return

    if (socket.hasListeners(`x-token/${id}`)) {
      socket.removeEventListener(`x-token/${id}`)
    }

    socket.on(`x-token/${id}`, listener)
    socket.emit('x-token/deploy/initialize', id)

    return () => {
      console.log('unmount is real')
      socket.off(`x-token/${id}`)
    }
  }, [id]); // eslint-disable-line

  useEffect(() => {
    (async (mId) => {
      const mDso = await getDso(userId, mId)
      if (mDso) {
        setDso(mDso)
      }
    })(id)
  }, [id])

  return {
    dso,
    messages,
    deploy,
    loading
  }
}

const Deploy = ({ match }: RouteProps) => {
  const {
    params: { userId, id }
  } = match
  const { dso, messages, loading, deploy } = useDeployLogic(userId, id)

  return dso ? (
    <Container>
      <Typography variant='h3'>Deploy X-Token</Typography>
      <Box my={4}>
        <Grid container spacing={4} component={Paper} style={{ padding: 16 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              value={dso.tokenName || ''}
              disabled
              label='Token Name'
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              value={dso.tokenSymbol || ''}
              disabled
              label='Token Symbol'
            />
          </Grid>

          {!dso.deploymentInfo && !dso.policyBuilder && (
            <Grid item xs={12} container justify='center'>
              <ButtonWithLoading
                isFetching={loading}
                onClick={() => deploy()}
                disableElevation
                variant='contained'
                color='primary'
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
      <Box my={4} style={{ marginLeft: '-16px', marginRight: '-16px' }}>
        <Grid container>
          <Grid item xs={12} component={Paper}>
            <TextField
              id='outlined-multiline-static'
              label='Message'
              multiline
              fullWidth
              value={messages.current.length ? messages.current.join('\n') : ''}
              disabled
              rows={12}
              variant='outlined'
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  ) : (
    <span>loading</span>
  )
}

export default Deploy
