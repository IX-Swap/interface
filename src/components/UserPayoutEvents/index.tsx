import React, { useEffect, useMemo, useState } from 'react'
import { t } from '@lingui/macro'

import { useGetPayoutList } from 'state/payout/hooks'

import { AllPayouts } from './AllPayout'
import { MyPayouts } from './MyPayout'
import { Container, Tab, Tabs, Body } from './styleds'

const tabs = [
  { label: t`All Payout Events`, value: 'all' },
  { label: t`My Payout Events`, value: 'my' },
]

export const UserPayoutEvents = () => {
  const [tab, handleTab] = useState('all')

  const tabComponent = useMemo(() => {
    switch (tab) {
      case 'all':
        return <AllPayouts />
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
            {label}
          </Tab>
        ))}
      </Tabs>
      <Body>{tabComponent}</Body>
    </Container>
  )
}
