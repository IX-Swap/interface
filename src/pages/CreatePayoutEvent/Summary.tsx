import React, { FC } from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'
import { Flex } from 'rebass'

import { TYPE } from 'theme'
import { Label } from 'components/Label'

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
  poolsAmount: number
  walletsAmount: number
}

export const Summary: FC<Props> = ({ poolsAmount, walletsAmount }) => {
  return (
    <>
      <Label text={t`Token Payout Summary`}/>

      <Card>
        <Flex marginBottom="8px" justifyContent="space-between" alignItems="center" opacity="50%">
          <TYPE.body3>
            <Trans>Wrapped Tokens (Pools)</Trans>
          </TYPE.body3>
          <TYPE.body3>{`${poolsAmount} tokens`}</TYPE.body3>
        </Flex>
        <Flex marginBottom="8px" justifyContent="space-between" alignItems="center" opacity="50%">
          <TYPE.body3>
            <Trans>Wrapped Tokens (Wallets)</Trans>
          </TYPE.body3>
          <TYPE.body3>{`${walletsAmount} tokens`}</TYPE.body3>
        </Flex>

        <Divider />

        <Flex justifyContent="space-between">
          <TYPE.body1 color={'text1'}>
            <Trans>Total Wrapped Token Supply</Trans>
          </TYPE.body1>
          <TYPE.body1 color={'text1'}>{`${walletsAmount + poolsAmount} tokens`}</TYPE.body1>
        </Flex>
      </Card>
    </>
  )
}
