import React, { useState } from 'react'
import { LightBackground } from 'theme/Background'
import { FarmingTabs } from './FarmingTabs'
import { Stacking } from './Stacking'
import { Container } from './styleds'
import { Vesting } from './Vesting'

export enum FARMING_TABS {
  STAKING = 'Staking',
  VESTING = 'Vesting',
}

export const Farming = () => {
  const [tab, setTab] = useState(FARMING_TABS.VESTING)
  return (
    <>
      <LightBackground />
      <Container width={['100%']} maxWidth={'1370px'} paddingLeft="15px" paddingRight="15px">
        <FarmingTabs {...{ tab, setTab }} />
        {tab === FARMING_TABS.VESTING && <Vesting />}
        {tab === FARMING_TABS.STAKING && <Stacking />}
      </Container>
    </>
  )
}
