import React, { FC } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'

import { Label } from 'components/Label'
import { TYPE } from 'theme'
import { Checkbox } from 'components/Checkbox'
import { TextInput } from 'pages/KYC/common'
import { ExtraInfoCard } from 'pages/KYC/styleds'

import { payoutTypes } from './mock'
import { FormValues } from './utils'

interface Props {
  onValueChange: (key: string, newValue: any) => void
  availableForEditing: string[]
}

export const PayoutType: FC<Props> = ({ onValueChange, availableForEditing }) => {
  const { values, errors, touched } = useFormikContext<FormValues>()

  const description = payoutTypes.find(({ label }) => values.type === label)?.description || null

  const onTypeChange = (label: string) => {
    if (label !== 'Other') onValueChange('otherType', '')
    onValueChange('type', label)
  }

  return (
    <Box marginBottom="24px">
      <Label
        marginBottom="8px"
        label={t`Payout Type`}
        required
        tooltipText="Select the type of payout applicable for this payout event."
      />
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
            disabled={!availableForEditing.includes('type')}
          />
        ))}
      </Card>
      {touched.type && errors.type && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {errors.type}
        </TYPE.small>
      )}
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
          required
          error={touched.otherType ? errors.otherType : ''}
          disabled={!availableForEditing.includes('type')}
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
