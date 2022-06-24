import React, { FC, useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Trans } from '@lingui/macro'
import { useHistory } from 'react-router-dom'

import { Select } from 'pages/KYC/common'
import { DateInput } from 'components/DateInput'
import { getTotalAmountByRecordDate, useCreateDraftPayout, usePayoutState } from 'state/payout/hooks'
import { TYPE } from 'theme'
import { FormGrid } from 'pages/KYC/styleds'
import { useTokensList } from 'hooks/useTokensList'
import { useAddPopup } from 'state/application/hooks'

import { Summary } from './Summary'
import { PayoutEventBlock } from './PayoutEventBlock'
import { initialValues } from './mock'
import { FormCard } from './styleds'
import { transformPayoutDraftDTO } from './utils'
import { isBefore } from 'pages/PayoutItem/utils'

export const PayoutForm: FC = () => {
  const { secTokensOptions } = useTokensList()
  const [tokenAmount, setTokenAmount] = useState<any>({
    walletsAmount: null,
    poolsAmount: null,
    totalSum: 0,
  })
  const { error } = usePayoutState()
  const [isAmountLoading, setIsAmountLoading] = useState(false)
  const createDraft = useCreateDraftPayout()
  const addPopup = useAddPopup()
  const history = useHistory()

  useEffect(() => {
    if (error) {
      addPopup({
        info: {
          success: false,
          summary: error.message ?? 'Something went wrong',
        },
      })
    }
  }, [error])

  const handleFormSubmit = async (values: any) => {
    const body = transformPayoutDraftDTO(values)
    const data = await createDraft(body)

    if (data?.id) {
      addPopup({
        info: {
          success: true,
          summary: 'Payout was successfully created',
        },
      })
      history.push(`/payout/${data.id}`)
    } else {

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
        const { recordDate, secToken } = values
        const isRecordFuture = isBefore(values.recordDate)

        const onValueChange = (key: string, value: any) => {
          setFieldValue(key, value, false)
        }

        const fetchAmountByRecordDate = async (secToken: any, recordDate: any) => {
          const isFuture = isBefore(recordDate)
          if (secToken?.value && recordDate && !isFuture) {
            setIsAmountLoading(true)
            const data = await getTotalAmountByRecordDate(secToken.value, recordDate)

            if (data) {
              const totalSum = (+data.walletTokens ?? 0) + (+data.poolTokens ?? 0)
              setTokenAmount({
                walletsAmount: data.walletTokens ? +data.walletTokens : null,
                poolsAmount: data.poolTokens ? +data.poolTokens : null,
                totalSum: totalSum.toFixed(2),
              })
              onValueChange('secTokenAmount', totalSum)
            }

            setIsAmountLoading(false)
          }
        }

        return (
          <form onSubmit={handleSubmit}>
            <FormCard marginBottom="32px">
              <TYPE.title6 marginBottom="28px">
                <Trans>SECURITY TOKENS</Trans>
              </TYPE.title6>
              <FormGrid style={{ marginBottom: 20 }}>
                <Select
                  label="SEC Token"
                  placeholder="Choose SEC token"
                  selectedItem={values.secToken}
                  items={secTokensOptions}
                  onSelect={(newToken) => {
                    onValueChange('secToken', newToken)
                    fetchAmountByRecordDate(newToken, recordDate)
                  }}
                  required
                />
                <DateInput
                  label="Record Date"
                  placeholder="Choose record date"
                  maxHeight={60}
                  openTo="date"
                  value={values.recordDate}
                  onChange={(newDate) => {
                    onValueChange('recordDate', newDate)
                    fetchAmountByRecordDate(secToken, newDate)
                  }}
                  required
                  tooltipText="Record Date"
                />
              </FormGrid>

              <Summary
                isRecordFuture={isRecordFuture}
                isLoading={isAmountLoading}
                tokenAmount={tokenAmount}
                setTokenAmount={setTokenAmount}
                onValueChange={onValueChange}
              />
            </FormCard>

            <PayoutEventBlock
              isRecordFuture={isRecordFuture}
              values={values}
              onValueChange={onValueChange}
              totalSecTokenSum={tokenAmount.totalSum ?? 0}
            />
          </form>
        )
      }}
    </Formik>
  )
}
