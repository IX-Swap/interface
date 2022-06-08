import React, { FC } from 'react'
import { Formik } from 'formik'
import { Trans } from '@lingui/macro'

import { Select } from 'pages/KYC/common'
import { DateInput } from 'components/DateInput'
import { Summary } from './Summary'
import { PayoutEventBlock } from './PayoutEventBlock'

import { TYPE } from 'theme'
import { FormGrid } from 'pages/KYC/styleds'
import { initialValues, mockSecTokens } from './mock'
import { FormCard } from './styleds'

export const PayoutForm: FC = () => {
  const handleFormSubmit = async (values: any) => {
    console.log('submitted', values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
      isInitialValid={false}
      enableReinitialize
      onSubmit={handleFormSubmit}
    >
      {({ values, setFieldValue }) => {
        const onValueChange = (key: string, value: any) => {
          setFieldValue(key, value, false)
        }
        return (
          <>
            <FormCard marginBottom="32px">
              <TYPE.title6 marginBottom="28px">
                <Trans>SECURITY TOKENS</Trans>
              </TYPE.title6>
              <FormGrid style={{ marginBottom: 20 }}>
                <Select
                  label="Sec Token"
                  placeholder="Choose SEC token"
                  selectedItem={values.secTokenId}
                  items={mockSecTokens}
                  onSelect={(item) => onValueChange('secTokenId', item)}
                  required
                />
                <DateInput
                  label="Record Date"
                  placeholder="Choose record date"
                  maxHeight={60}
                  openTo="date"
                  value={values.recordDate}
                  onChange={(newDate) => onValueChange('recordDate', newDate)}
                  required
                />
              </FormGrid>

              <Summary walletsAmount={200} poolsAmount={500} />
            </FormCard>

            <PayoutEventBlock values={values} onValueChange={onValueChange} />
          </>
        )
      }}
    </Formik>
  )
}
