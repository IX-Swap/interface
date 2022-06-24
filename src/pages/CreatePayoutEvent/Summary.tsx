import React, { FC, useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'
import { Flex } from 'rebass'

import { TYPE } from 'theme'
import { Label } from 'components/Label'
import { ExtraInfoCard } from 'pages/KYC/styleds'

const Card = styled.div`
  background: ${({ theme }) => theme.bg19};
  padding: 16px;
  border-radius: 20px;
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
      onValueChange('secTokenAmount', '')
    }
  }, [isRecordFuture])

  const getValue = (amount: number) => {
    if (isLoading) return t`Loading...`
    if (isRecordFuture) return t`Available on Record Date`
    if (amount) return `${amount} tokens`
    return '-'
  }

  return (
    <>
      <Label label={t`Token Payout Summary`} />

      <Card>
        <Flex marginBottom="8px" justifyContent="space-between" alignItems="center" opacity="50%">
          <TYPE.body3>
            <Trans>Wrapped Tokens (Pools)</Trans>
          </TYPE.body3>
          <TYPE.body3>{getValue(poolsAmount?.toFixed(2))}</TYPE.body3>
        </Flex>
        <Flex marginBottom="8px" justifyContent="space-between" alignItems="center" opacity="50%">
          <TYPE.body3>
            <Trans>Wrapped Tokens (Wallets)</Trans>
          </TYPE.body3>
          <TYPE.body3>{getValue(walletsAmount?.toFixed(2))}</TYPE.body3>
        </Flex>

        <Divider />

        <Flex justifyContent="space-between">
          <TYPE.body1 color={'text1'}>
            <Trans>Total Wrapped Token Supply</Trans>
          </TYPE.body1>
          <TYPE.body1 color={'text1'}>
            {isLoading || isRecordFuture ? '' : walletsAmount || poolsAmount ? `${totalSum} tokens` : '-'}
          </TYPE.body1>
        </Flex>
      </Card>

      {isRecordFuture && (
        <ExtraInfoCard style={{ marginTop: 16 }}>
          <TYPE.title10 color="error">{t`Wrapped token amounts to be computed and will become available on the Record Date you selected.`}</TYPE.title10>
        </ExtraInfoCard>
      )}
    </>
  )
}
