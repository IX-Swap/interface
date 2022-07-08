import React, { FC } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'
import { t } from '@lingui/macro'

import { Label } from 'components/Label'
import { TYPE } from 'theme'
import { Checkbox } from 'components/Checkbox'
import { TextInput } from 'pages/KYC/common'
import { ExtraInfoCard } from 'pages/KYC/styleds'

import { payoutTypes } from './mock'

interface Props {
  values: any
  onValueChange: (key: string, newValue: any) => void
}

export const PayoutType: FC<Props> = ({ values, onValueChange }) => {
  const description = payoutTypes.find(({ label }) => values.type === label)?.description || null

  const onTypeChange = (label: string) => {
    if (label !== 'Other') onValueChange('otherType', '')
    onValueChange('type', label)
  }

  return (
    <Box marginBottom="24px">
      <Label marginBottom="8px" label={t`Payout Type`} required />
      <Card style={{ marginBottom: 8 }}>
        {payoutTypes.map(({ id, label }) => (
          <Checkbox
            key={`payout-type-${id}`}
            scaleSize={1.1}
            buttonStyles={{ marginRight: 32 }}
            isRadio
            label={label}
            onClick={() => onTypeChange(label)}
            checked={values.type === label}
          />
        ))}
      </Card>
      {values.type && (
        <ExtraInfoCard>
          <TYPE.buttonMuted opacity="50%">{description}</TYPE.buttonMuted>
        </ExtraInfoCard>
      )}
      {values.type === 'Other' && (
        <TextInput
          style={{ marginTop: 12 }}
          placeholder="Write payout type"
          onChange={(e: any) => onValueChange('otherType', e.currentTarget.value)}
          value={values.otherType}
        />
      )}
    </Box>
  )
}

const Card = styled.div`
  background: ${({ theme }) => theme.bg19};
  padding: 12px 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
`
