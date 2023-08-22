import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'

import { useEagerConnect, useInactiveListener } from '../../hooks/web3'
import { NetworkContextName } from '../../constants/misc'
import Loader from '../Loader'
import { metaMask } from 'connectors/metaMask'

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
`

const Message = styled.h2`
  color: ${({ theme }) => theme.secondary1};
`

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
  const { connector, isActive } = useWeb3React()

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])

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


  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  // if (!active && networkError) {
  //   return (
  //     <MessageWrapper>
  //       <Message>
  //         <Trans>
  //           Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.
  //         </Trans>
  //       </Message>
  //     </MessageWrapper>
  //   )
  // }

  // if neither context is active, spin
  if (!isActive) {
    return showLoader ? (
      <MessageWrapper>
        <Loader />
      </MessageWrapper>
    ) : null
  }

  return children
}
