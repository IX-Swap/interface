import React from 'react'

import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'
import AppBody from 'pages/AppBody'
import { DesktopOnly } from 'theme'
import { useSetHideHeader } from 'state/application/hooks'
import Header from 'components/Header'
import { isMobile } from 'react-device-detect'
import PoolContent from './PoolContent'

export default function Pool() {
  const { chainId } = useActiveWeb3React()
  const isBlurred = chainId !== undefined && !TGE_CHAINS_WITH_SWAP.includes(chainId)

  const hideHeader = useSetHideHeader()

  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])

  return (
    <>
      <Header />

      {!isBlurred && <DesktopOnly>{/* <TopContent /> */}</DesktopOnly>}
      <div
        style={{
          marginTop: isMobile ? '10px' : '140px',
          width: isMobile ? '380px' : '550px',
        }}
      >
        <AppBody page="liquidity" blurred={isBlurred}>
          <PoolContent />
        </AppBody>
      </div>
    </>
  )
}
