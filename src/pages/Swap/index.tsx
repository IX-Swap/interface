import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useAccount } from 'wagmi'

import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import AppBody from '../AppBody'
import SwapContent from './SwapContent'

export default function Swap({ history }: RouteComponentProps) {
  const { chainId } = useAccount()

  return (
    <>
      <AppBody blurred={chainId !== undefined && !TGE_CHAINS_WITH_SWAP.includes(chainId)}>
        <SwapContent history={history} />
      </AppBody>
    </>
  )
}
