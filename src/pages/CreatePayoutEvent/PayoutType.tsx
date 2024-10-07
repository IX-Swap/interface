import React, { FC } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'
import { useFormikContext } from 'formik'
import { capitalize } from '@material-ui/core'

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

  const description = payoutTypes.find(({ value }) => values.type === value)?.description || null

  const onTypeChange = (value: string) => {
    if (value !== 'other') onValueChange('otherType', '')
    onValueChange('type', value)
  }

  return (
    <>
      <Box marginBottom="24px">
        {!availableForEditing.includes('type') ? (
          <>
            <div style={{ color: '#555566', fontSize: '13px', marginBottom: '18px' }}>Payout Type</div>
            <div>{capitalize(values.type)}{values.type === 'other' ? ` - ${values.otherType}` : ''}</div>
          </>
        ) : (
          <>
            {payoutTypes.map(({ id, label, value }) => (
              <Card key={`payout-type-card-${id}`}>
                <Checkbox
                  key={`payout-type-${id}`}
                  scaleSize={0.8}
                  buttonStyles={{ marginRight: 32 }}
                  isRadio
                  label={label}
                  onClick={() => onTypeChange(value)}
                  checked={values.type === value}
                  disabled={!availableForEditing.includes('type')}
                />
              </Card>
            ))}
            {touched.type && errors.type && (
              <TYPE.small marginTop="4px" color={'red1'}>
                {errors.type}
              </TYPE.small>
            )}
            {values.type && (
              <ExtraInfoCard style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <TYPE.buttonMuted color={'#292933'}>{description?.split('-')[0]}</TYPE.buttonMuted>
                <TYPE.buttonMuted color={'#666680'} fontWeight={400}>
                  {description?.split('-')[1]}
                </TYPE.buttonMuted>
              </ExtraInfoCard>
            )}
            {values.type === 'other' && (
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
          </>
        )}
      </Box>
    </>
  )
}

const Card = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  border: 1px solid #e6e6ff;
  margin-right: 30px;
  width: 180px;
  margin-bottom: 20px;

  &:last-child {
    margin-right: 0;
  }
`
