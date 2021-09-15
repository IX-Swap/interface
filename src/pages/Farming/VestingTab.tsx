import React from 'react'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import { LightBackground } from 'theme/Background'
import { Container } from './styleds'
import { FARMING_STRINGS, FARMING_TABS } from './Vesting/enum'
import { Vesting } from './Vesting/Vesting'

const Title = styled(TYPE.title4)`
  padding: 0 15px;
`

export const VestingTab = () => {
  return (
    <>
      <LightBackground />
      <Container width={['100%']} maxWidth={'1299px'}>
        <Title>{FARMING_STRINGS[FARMING_TABS.VESTING]}</Title>
        <Vesting />
      </Container>
    </>
  )
}
