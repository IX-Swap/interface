import React, { FC } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'
import { t } from '@lingui/macro'

import { Label } from 'components/Label'
import { TYPE } from 'theme'
import { Checkbox } from 'components/Checkbox'

import { payoutTypes } from './mock'
import { ExtraInfoCard } from 'pages/KYC/styleds'

const Card = styled.div`
  background: ${({ theme }) => theme.bg19};
  padding: 12px 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
`

export const PayoutType: FC = () => {
  return (
    <Box marginBottom="24px">
      <Label marginBottom="8px" text={t`Payout Type`} />
      <Card style={{ marginBottom: 8 }}>
        {payoutTypes.map(({ id, label }) => (
          <Checkbox
            key={`payout-type-${id}`}
            scaleSize={1.1}
            buttonStyles={{ marginRight: 26 }}
            isRadio
            label={label}
            checked={id === 1}
          />
        ))}
      </Card>
      <ExtraInfoCard>
        <TYPE.buttonMuted opacity="50%">Dividends - One payment date</TYPE.buttonMuted>
      </ExtraInfoCard>
    </Box>
  )
}
