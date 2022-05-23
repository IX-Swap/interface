/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Grid, Skeleton } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { network } from 'config/blockchain/connectors'
import { NetworkContextName } from 'config/blockchain/constants'
import { useEagerConnect, useInactiveListener } from 'hooks/blockchain/web3'
import React, { useEffect, useState } from 'react'

export default function Web3ReactManager({
  children
}: {
  children: JSX.Element
}) {
  const { active } = useWeb3React()
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork
  } = useWeb3React(NetworkContextName)

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (triedEager && !networkActive && networkError == null && !active) {
      activateNetwork(network)
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active])

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true)
    }, 600)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null
  }

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (!active && networkError != null) {
    return (
      <Grid
        container
        direction='column'
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item>
          Oops! An unknown error occurred. Please refresh the page, or visit
          from another browser or device.
        </Grid>
      </Grid>
    )
  }

  // if neither context is active, spin
  if (!active && !networkActive) {
    return showLoader ? (
      <Grid
        container
        direction='column'
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item>
          <Skeleton
            style={{ marginRight: 10 }}
            variant='rectangular'
            height={25}
            width={25}
          />
        </Grid>
      </Grid>
    ) : null
  }

  return children
}
