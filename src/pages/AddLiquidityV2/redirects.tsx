import React, { useEffect, useMemo } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import AddLiquidityV2 from './index'
import styled from 'styled-components'
import { Header } from 'pages/Launchpad/Header'
import { useSetHideHeader } from 'state/application/hooks'
import { SUPPORTED_TGE_CHAINS, TGE_CHAINS_WITH_STAKING } from 'constants/addresses'
import Portal from '@reach/portal'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'
import { useActiveWeb3React } from 'hooks/web3'
import { useTokens } from 'pages/Pool/useTokens'

export const AddLiduidityContainer = styled.div<{ background?: string }>`
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
  const { chainId } = useActiveWeb3React()
  const { account } = useTokens()

  useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])

  const blurred = useMemo(
    () => ![...TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS.MAIN].includes(chainId || 0),
    [account, chainId]
  )

  const {
    match: {
      params: { currencyIdA, currencyIdB },
    },
  } = props

  if (currencyIdA && currencyIdB && currencyIdA.toLowerCase() === currencyIdB.toLowerCase()) {
    return <Redirect to={`/add/${currencyIdA}`} />
  }

  if (blurred) {
    return (
      <Portal>
        <CenteredFixed width="100vw" height="100vh">
          <NetworkNotAvailable />
        </CenteredFixed>
      </Portal>
    )
  }

  return (
    <>
      <Header />
      <AddLiduidityContainer>
        <AddLiquidityV2 {...props} />
      </AddLiduidityContainer>
    </>
  )
}
