import { Trans } from '@lingui/macro'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { CustodianTabs } from 'components/NavigationTabs'
import { Border, ToggleOption, ToggleWrapper } from 'components/Tabs'
import AppBody from 'pages/AppBody'
import React, { useState } from 'react'
import { useAuthState } from 'state/auth/hooks'
import { AllSecTokens } from './AllSecTokens'
import { MySecurities } from './MySecurities'

const bodyProps = {
  padding: '0',
  paddingXS: '0',
}
export default function Custodian() {
  const { token } = useAuthState()
  const isLoggedIn = !!token
  const [showAllSecTokens, setShowAllSecTokens] = useState<boolean>(!isLoggedIn)
  return (
    <>
      <AppBody {...bodyProps}>
        <ColumnCenter style={{ padding: '26px 37px' }}>
          <CustodianTabs />
          {isLoggedIn && (
            <AutoColumn style={{ paddingBottom: 0 }}>
              <ToggleWrapper>
                <ToggleOption onClick={() => setShowAllSecTokens(!showAllSecTokens)} active={!showAllSecTokens}>
                  <Trans>My Securities</Trans>
                  <Border active={!showAllSecTokens} />
                </ToggleOption>
                <ToggleOption onClick={() => setShowAllSecTokens(!showAllSecTokens)} active={showAllSecTokens}>
                  <Trans>All Sec tokens</Trans>
                  <Border active={showAllSecTokens} />
                </ToggleOption>
              </ToggleWrapper>
            </AutoColumn>
          )}
        </ColumnCenter>
        {!showAllSecTokens && <MySecurities />}
        {showAllSecTokens && <AllSecTokens />}
      </AppBody>
    </>
  )
}
