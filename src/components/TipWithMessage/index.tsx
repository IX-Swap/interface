import React, { ReactNode } from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'
import { TipCard } from '../Card'
import { AutoColumn, ColumnCenter } from '../Column'
import { Trans } from '@lingui/macro'
import { ReactComponent as Check } from '../../assets/images/tipnew.svg'
import { SvgIconWrapper } from 'theme'

const TipWrapper = styled.div`
  max-width: 592px;
  width: 100%;
`
interface Props {
  message: ReactNode
  page?: string
}
export const TipWithMessage = ({ message, page }: Props) => {
  return (
    <TipWrapper>
      <ColumnCenter>
        <TipCard style={{ padding: page === 'find' ? '10px 30px' : '20px' }}>
          <AutoColumn gap="10px">
            <div style={{ display: 'flex' }}>
              <SvgIconWrapper style={{ margin: '0px 9px 36px 0px' }} size={12}>
                <Check />
              </SvgIconWrapper>
              <Text fontWeight={400}>
                <b>
                  <Trans>Tip: </Trans>
                </b>
                &nbsp; {message}
              </Text>
            </div>
          </AutoColumn>
        </TipCard>
      </ColumnCenter>
    </TipWrapper>
  )
}
