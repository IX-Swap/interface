import React from 'react'
import { LightBackground } from 'theme/Background'
import { FARMING_TABS } from './enum'
import { FarmingTabs } from './FarmingTabs'
import { Staking } from './Staking'
import { Container } from './styleds'

export const StakingTab = () => {
  return (
    <>
      <LightBackground />
      <Container width={['100%']} maxWidth={'1300px'}>
        <FarmingTabs {...{ tab: FARMING_TABS.STAKING }} />
        <Staking />
      </Container>
    </>
  )
}
