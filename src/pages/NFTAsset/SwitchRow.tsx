import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { TYPE } from 'theme'
import { ReactComponent as Warning } from 'assets/images/warning.svg'

interface NftNsfwProps {
  data: boolean
  title: string
}

export const SwitchRow = ({ data, title }: NftNsfwProps) => {
  return (
    <Container>
      <Warning />
      <TYPE.body fontWeight={600} paddingRight="7px">
        <Trans>{title}</Trans>
      </TYPE.body>
      <TYPE.body fontWeight={600}>
        <Trans>{data ? 'On' : 'Off'}</Trans>
      </TYPE.body>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 22px 1fr auto;
  column-gap: 9px;
  align-items: center;
`
