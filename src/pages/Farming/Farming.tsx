import React, { useState } from 'react'
import { LightBackground } from 'theme/Background'
import { FarmingTabs } from './FarmingTabs'
import { Container } from './styleds'

export enum FARMING_TABS {
  STAKING = 'Staking',
  VESTING = 'Vesting',
}

export const Farming = () => {
  const [tab, setTab] = useState(FARMING_TABS.VESTING)
  return (
    <>
      <LightBackground />
      <Container width={['100%', '90%', '100%']} maxWidth={'1370px'}>
        <FarmingTabs {...{ tab, setTab }} />
      </Container>
    </>
  )
}
