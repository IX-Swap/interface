import React from 'react'
import styled from 'styled-components'
import { Trans, t } from '@lingui/macro'

import { TYPE } from 'theme'
import { ReactComponent as Warning } from 'assets/images/warning.svg'
import Column from 'components/Column'

interface NftNsfwProps {
  data: boolean
  title: string
  info?: string
}

export const SwitchRow = ({ data, title, info }: NftNsfwProps) => {
  return (
    <Container>
      <Warning />
      <Column>
        <TYPE.body fontWeight={600} paddingRight="7px">
          {t`${title}`}
        </TYPE.body>
        {info && <Info>{t`${info}`}</Info>}
      </Column>
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

const Info = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: rgba(237, 206, 255, 0.5);
`
