import React, { FC, useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'
import { Flex } from 'rebass'

import { TYPE } from 'theme'
import { Label } from 'components/Label'
import { ExtraInfoCard } from 'pages/KYC/styleds'
import { Line } from 'components/Line'

const Card = styled.div`
  background: ${({ theme }) => theme.bg0};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e6e6ff;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.bg21};
  height: 1px;
  margin-bottom: 8px;
`

interface Props {
  tokenAmount: any
  isLoading: boolean
  isRecordFuture: boolean
  setTokenAmount: (newValue: any) => void
  onValueChange: (key: string, value: any) => void
}

export const Summary: FC<Props> = ({ tokenAmount, isLoading, isRecordFuture, setTokenAmount, onValueChange }) => {
  const { poolsAmount, walletsAmount, totalSum } = tokenAmount

  useEffect(() => {
    if (isRecordFuture) {
      setTokenAmount({
        walletsAmount: null,
        poolsAmount: null,
        totalSum: null,
      })
      onValueChange('secTokenAmount', 0)
    }
  }, [isRecordFuture])

  const getValue = (amount: number) => {
    if (isLoading) return `Loading...`
    if (isRecordFuture) return `Available on Record Date`
    if (amount) return `${amount} tokens`
    return '-'
  }

  return (
    <>
      <Label
        label={`Token Payout Summary`}
        tooltipText="Shows the total amount of tokens both held in wallets and contributed to liquidity pools. It also indicates the number of tokens to be distributed for this payout event."
      />
      <Card>
        <Flex marginBottom="16px" justifyContent="space-between" alignItems="center" opacity="50%">
          <TYPE.title11>
            <Trans>Total amount in liquidity pools</Trans>
          </TYPE.title11>
          <TYPE.title11>{getValue(poolsAmount?.toFixed(2))}</TYPE.title11>
        </Flex>
        <Flex marginBottom="16px" justifyContent="space-between" alignItems="center" opacity="50%">
          <TYPE.title11>
            <Trans>Total amount of all wallets</Trans>
          </TYPE.title11>
          <TYPE.title11>{getValue(walletsAmount?.toFixed(2))}</TYPE.title11>
        </Flex>

        <Line style={{ margin: '20px 0px' }} />

        <Flex justifyContent="space-between">
          <TYPE.main1>
            <Trans>Total token supply</Trans>
          </TYPE.main1>
          <TYPE.body1 color={'text1'}>
            {isLoading || isRecordFuture ? '' : walletsAmount || poolsAmount ? `${totalSum} tokens` : '-'}
          </TYPE.body1>
        </Flex>
      </Card>

      {isRecordFuture && (
        <ExtraInfoCard style={{ marginTop: 16 }}>
          <TYPE.title10 color="error">
            <Trans>{`Wrapped token amounts to be computed and will become available on the Record Date you selected.`}</Trans>
          </TYPE.title10>
        </ExtraInfoCard>
      )}
    </>
  )
}
