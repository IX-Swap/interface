import React, { useEffect } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import AddLiquidityV2 from './index'
import styled from 'styled-components'
// import { Header } from 'pages/Launchpad/Header'
import { useSetHideHeader } from 'state/application/hooks'
import Portal from '@reach/portal'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import Header from 'components/Header'
import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'
import { DEFAULT_CHAIN_ID } from 'config'
import { useAccount } from 'wagmi'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'

export const AddWhiteBGContainer = styled.div<{ background?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 0 2rem;
  font-family: ${(props) => props.theme.launchpad.font};
  background: ${(props) => props.background ?? props.theme.launchpad.colors.newBackground};

  * {
    font-family: ${(props) => props.theme.launchpad.font};
  }

  /* Media Query for Mobile */
  @media (max-width: 768px) {
    padding: 0 1rem;
    background: ${(props) => props.background ?? props.theme.launchpad.colors.newBackground};
  }
`

// export const AddLiduidityContainer = styled.div<{ background?: string }>`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   min-height: 100vh;
//   width: 100%;
//   padding: 0 4rem;
//   font-family: ${(props) => props.theme.launchpad.font};
//   background: ${(props) => props.background ?? props.theme.launchpad.colors.newBackground};
//   * {
//     font-family: ${(props) => props.theme.launchpad.font};
//   }
// `

export const RedirectDuplicateTokenIdsV2: React.FC<
  RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>
> = (props) => {
  const hideHeader = useSetHideHeader()
  const { chainId } = useAccount()

  useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])

  const {
    match: {
      params: { currencyIdA, currencyIdB },
    },
  } = props

  if (currencyIdA && currencyIdB && currencyIdA.toLowerCase() === currencyIdB.toLowerCase()) {
    return <Redirect to={`/add/${currencyIdA}`} />
  }

  const blurred = chainId !== undefined && !TGE_CHAINS_WITH_SWAP.includes(chainId)

  if (blurred) {
    return (
      <Portal>
        <CenteredFixed width="100vw" height="100vh">
          <NetworkNotAvailable expectChainId={Number(DEFAULT_CHAIN_ID)} />
        </CenteredFixed>
      </Portal>
    )
  }

  return (
    <>
      <Header />
      {/* <AddLiduidityContainer> */}
      <AddLiquidityV2 {...props} />
      {/* </AddLiduidityContainer> */}
    </>
  )
}
