import { Trans } from '@lingui/macro'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { CustodianTabs } from 'components/NavigationTabs'
import { Border, ToggleOption, ToggleWrapper } from 'components/Tabs'
import { useActiveWeb3React } from 'hooks/web3'
import { SUPPORTED_TGE_CHAINS } from 'pages/App'
import AppBody from 'pages/AppBody'
import React, { useState, useEffect } from 'react'
import { useAuthState } from 'state/auth/hooks'
import { AllSecTokens } from './AllSecTokens'
import { MySecurities } from './MySecurities'
import { CustodianToggleWrapper } from './styleds'

export default function Custodian() {
  const { token } = useAuthState()
  const { account, chainId } = useActiveWeb3React()
  const isLoggedIn = !!token && !!account
  const [showAllSecTokens, setShowAllSecTokens] = useState<boolean>(!isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn && !showAllSecTokens) {
      setShowAllSecTokens(true)
    }
  }, [isLoggedIn])

  return (
    <>
      <AppBody blurred={chainId === SUPPORTED_TGE_CHAINS.MAIN}>
        <ColumnCenter style={{ paddingBottom: '26px' }}>
          <CustodianTabs />
          {isLoggedIn && (
            <AutoColumn style={{ paddingBottom: 0 }}>
              <CustodianToggleWrapper>
                <ToggleOption onClick={() => setShowAllSecTokens(!showAllSecTokens)} active={!showAllSecTokens}>
                  <Trans>My Securities</Trans>
                  <Border active={!showAllSecTokens} />
                </ToggleOption>
                <ToggleOption onClick={() => setShowAllSecTokens(!showAllSecTokens)} active={showAllSecTokens}>
                  <Trans>Other</Trans>
                  <Border active={showAllSecTokens} />
                </ToggleOption>
              </CustodianToggleWrapper>
            </AutoColumn>
          )}
        </ColumnCenter>
        {!showAllSecTokens && <MySecurities />}
        {showAllSecTokens && <AllSecTokens />}
      </AppBody>
    </>
  )
}
