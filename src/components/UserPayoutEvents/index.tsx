import React, { useMemo, useState } from 'react'
import { Trans, t } from '@lingui/macro'

import { AllPayoutEvents } from './AllPayoutEvents'
import { MyPayouts } from './MyPayoutEvents'
import { Container, Tab, Tabs, Body } from './styleds'

const tabs = [
  { label: `All Payout Events`, value: 'all' },
  { label: `My Payout Events`, value: 'my' },
]

export const UserPayoutEvents = () => {
  const [tab, handleTab] = useState('all')

  const tabComponent = useMemo(() => {
    switch (tab) {
      case 'all':
        return <AllPayoutEvents />
      case 'my':
        return <MyPayouts />
      default:
        return null
    }
  }, [tab])

  return (
    <Container>
      <Tabs>
        {tabs.map(({ label, value }) => (
          <Tab key={value} active={tab === value} onClick={() => handleTab(value)}>
            <Trans>{label}</Trans>
          </Tab>
        ))}
      </Tabs>
      <Body>{tabComponent}</Body>
    </Container>
  )
}
