import React from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'
import { TipCard } from '../../components/Card'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import { Trans } from '@lingui/macro'

interface Props {
  noLiquidity?: boolean
  isCreate?: boolean
}

const TipWrapper = styled.div`
  max-width: 592px;
  width: 100%;
`

export const Tip = ({ noLiquidity, isCreate }: Props) => {
  return (
    <>
      {noLiquidity ||
        (isCreate ? (
          <TipWrapper>
            <ColumnCenter>
              <TipCard>
                <AutoColumn gap="10px">
                  <Text fontWeight={400}>
                    <b>
                      <Trans>Tip:</Trans>
                    </b>{' '}
                    <Trans>
                      When you add liquidity, you will receive pool tokens representing your position. These tokens
                      automatically earn fees proportional to your share of the pool, and can be redeemed at any time.
                    </Trans>
                  </Text>
                </AutoColumn>
              </TipCard>
            </ColumnCenter>
          </TipWrapper>
        ) : (
          <TipWrapper>
            <ColumnCenter>
              <TipCard>
                <AutoColumn gap="10px">
                  <Text fontWeight={400}>
                    <Trans>
                      <b>
                        <Trans>Tip:</Trans>
                      </b>{' '}
                      When you add liquidity, you will receive pool tokens representing your position. These tokens
                      automatically earn fees proportional to your share of the pool, and can be redeemed at any time.
                    </Trans>
                  </Text>
                </AutoColumn>
              </TipCard>
            </ColumnCenter>
          </TipWrapper>
        ))}
    </>
  )
}
