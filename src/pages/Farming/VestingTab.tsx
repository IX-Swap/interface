import React from 'react'
import { LightBackground } from 'theme/Background'
import { FARMING_TABS } from './enum'
import { FarmingTabs } from './FarmingTabs'
import { Container } from './styleds'
import { Vesting } from './Vesting'

export const VestingTab = () => {
  return (
    <>
      <LightBackground />
      <Container width={['100%']} maxWidth={'1370px'} paddingLeft="15px" paddingRight="15px">
        <FarmingTabs {...{ tab: FARMING_TABS.VESTING }} />
        <Vesting />
      </Container>
    </>
  )
}
