import React, { ReactNode } from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'
import { TipCard } from '../Card'
import { AutoColumn, ColumnCenter } from '../Column'
import { Trans } from '@lingui/macro'

const TipWrapper = styled.div`
  max-width: 592px;
  width: 100%;
`
interface Props {
  message: ReactNode
}
export const TipWithMessage = ({ message }: Props) => {
  return (
    <TipWrapper>
      <ColumnCenter>
        <TipCard>
          <AutoColumn gap="10px">
            <Text fontWeight={400}>
              <b>
                <Trans>Tip:</Trans>
              </b>{' '}
              {message}
            </Text>
          </AutoColumn>
        </TipCard>
      </ColumnCenter>
    </TipWrapper>
  )
}
