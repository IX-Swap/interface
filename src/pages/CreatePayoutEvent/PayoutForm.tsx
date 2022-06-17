import React, { FC } from 'react'
import { Formik } from 'formik'
import { Trans } from '@lingui/macro'
// import { useHistory } from 'react-router-dom'

import { Select } from 'pages/KYC/common'
import { DateInput } from 'components/DateInput'
import { useCreateDraftPayout } from 'state/payout/hooks'
import { TYPE } from 'theme'
import { FormGrid } from 'pages/KYC/styleds'
import { useTokensList } from 'hooks/useTokensList'
import { useAddPopup } from 'state/application/hooks'

import { Summary } from './Summary'
import { PayoutEventBlock } from './PayoutEventBlock'
import { initialValues } from './mock'
import { FormCard } from './styleds'
import { transformPayoutDraftDTO } from './utils'

export const PayoutForm: FC = () => {
  const { secTokensOptions } = useTokensList()
  const createDraft = useCreateDraftPayout()
  const addPopup = useAddPopup()
  // const history = useHistory()

  const handleFormSubmit = async (values: any) => {
    const body = transformPayoutDraftDTO(values)
    const data = await createDraft(body)

    if (data?.id) {
      // history.push('/kyc') redirect to my payouts page
      addPopup({
        info: {
          success: true,
          summary: 'Payout was successfully created',
        },
      })
    } else {
      addPopup({
        info: {
          success: false,
          summary: 'Something went wrong',
        },
      })
    }
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
      {({ values, setFieldValue, handleSubmit }) => {
        const onValueChange = (key: string, value: any) => {
          setFieldValue(key, value, false)
        }

        return (
          <form onSubmit={handleSubmit}>
            <FormCard marginBottom="32px">
              <TYPE.title6 marginBottom="28px">
                <Trans>SECURITY TOKENS</Trans>
              </TYPE.title6>
              <FormGrid style={{ marginBottom: 20 }}>
                <Select
                  label="Sec Token"
                  placeholder="Choose SEC token"
                  selectedItem={values.secToken}
                  items={secTokensOptions}
                  onSelect={(item) => onValueChange('secToken', item)}
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
                  tooltipText="Record Date"
                />
              </FormGrid>

              <Summary walletsAmount={200} poolsAmount={500} />
            </FormCard>

            <PayoutEventBlock values={values} onValueChange={onValueChange} />
          </form>
        )
      }}
    </Formik>
  )
}
