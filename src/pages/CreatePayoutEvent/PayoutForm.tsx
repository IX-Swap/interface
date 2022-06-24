import React, { FC, useMemo, useState } from 'react'
import { Formik } from 'formik'
import { Trans } from '@lingui/macro'
import { useHistory } from 'react-router-dom'

import { Select } from 'pages/KYC/common'
import { DateInput } from 'components/DateInput'
import { getTotalAmountByRecordDate, useCreateDraftPayout } from 'state/payout/hooks'
import { TYPE } from 'theme'
import { FormGrid } from 'pages/KYC/styleds'
import { useAddPopup } from 'state/application/hooks'

import { Summary } from './Summary'
import { PayoutEventBlock } from './PayoutEventBlock'
import { initialValues } from './mock'
import { FormCard } from './styleds'
import { transformPayoutDraftDTO } from './utils'
import { isBefore } from 'pages/PayoutItem/utils'
import { useUserState } from 'state/user/hooks'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import CurrencyLogo from 'components/CurrencyLogo'

export const PayoutForm: FC = () => {
  const { me } = useUserState()

  const secTokensOptions = useMemo(() => {
    if (me?.managerOf?.length) {
      return me.managerOf.map(({ token }) => ({
        label: token.symbol,
        value: token.id,
        icon: <CurrencyLogo currency={new WrappedTokenInfo(token)} />,
      }))
    }
    return []
  }, [me])
  const [tokenAmount, setTokenAmount] = useState<any>({
    walletsAmount: null,
    poolsAmount: null,
    totalSum: null,
  })
  const [isAmountLoading, setIsAmountLoading] = useState(false)
  const createDraft = useCreateDraftPayout()
  const addPopup = useAddPopup()
  const history = useHistory()

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
      history.push('/token-manager/payout-events')
    } else {
      addPopup({
        info: {
          success: false,
          summary: data?.message ?? 'Something went wrong',
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

        const handleSecTokenChange = async (item: any) => {
          setIsAmountLoading(true)
          if (item?.value) {
            const data = await getTotalAmountByRecordDate(item.value)
            if (data) {
              const totalSum = (+data.walletTokens ?? 0) + (+data.poolTokens ?? 0)
              setTokenAmount({
                walletsAmount: data.walletTokens ? +data.walletTokens : null,
                poolsAmount: data.poolTokens ? +data.poolTokens : null,
                totalSum,
              })
              onValueChange('secTokenAmount', totalSum)
            }
          }
          onValueChange('secToken', item)
          setIsAmountLoading(false)
        }

        const isRecordFuture = isBefore(values.recordDate)

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
                  onSelect={handleSecTokenChange}
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

              <Summary isRecordFuture={isRecordFuture} isLoading={isAmountLoading} tokenAmount={tokenAmount} />
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
