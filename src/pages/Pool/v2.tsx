import React from 'react'

import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'
import AppBody from 'pages/AppBody'
import { isMobile } from 'react-device-detect'
import PoolContent from './PoolContent'

export default function Pool() {
  const { chainId } = useActiveWeb3React()
  const isBlurred = chainId !== undefined && !TGE_CHAINS_WITH_SWAP.includes(chainId)

  return (
    <AppBody blurred={isBlurred}>
      <div
        style={{
          marginTop: isMobile ? '10px' : '140px',
          width: isMobile ? '380px' : '550px',
        }}
      >
        <PoolContent />
      </div>
    </AppBody>
  )
}
