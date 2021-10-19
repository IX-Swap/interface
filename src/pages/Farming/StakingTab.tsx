import React from 'react'
import { TYPE } from 'theme'
import { LightBackground } from 'theme/Background'
import { FARMING_STRINGS, FARMING_TABS } from './Vesting/enum'
import { Staking } from './Staking'
import { Container } from './styleds'

export const StakingTab = () => {
  return (
    <>
      <LightBackground />
      <Container width={['100%']} maxWidth={'1400px'}>
        <TYPE.title4>{FARMING_STRINGS[FARMING_TABS.STAKING]}</TYPE.title4>
        <Staking />
      </Container>
    </>
  )
}
