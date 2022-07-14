import React, { FC, useEffect, useState, useMemo } from 'react'
import { useFormik, FormikProvider } from 'formik'
import { Trans } from '@lingui/macro'
import { useHistory } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import dayjs from 'dayjs'

import { Select } from 'pages/KYC/common'
import { DateInput } from 'components/DateInput'
import { getTotalAmountByRecordDate, useCreateDraftPayout, usePayoutState } from 'state/payout/hooks'
import { TYPE } from 'theme'
import { useUserState } from 'state/user/hooks'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import CurrencyLogo from 'components/CurrencyLogo'
import { routes } from 'utils/routes'
import { FormGrid } from 'pages/KYC/styleds'
import { useAddPopup } from 'state/application/hooks'

import { Summary } from './Summary'
import { PayoutEventBlock } from './PayoutEventBlock'
import { initialValues } from './mock'
import { FormCard } from './styleds'
import { availableInputsForEdit, transformPayoutDraftDTO } from './utils'
import { validation } from './validation'

export const PayoutForm: FC = () => {
  const { account } = useWeb3React()
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
      history.push({ pathname: routes.payoutItemManager(data.id) })
    } else {
    }
  }

  const status = 'draft'
  const paid = true

  const availableForEditing = useMemo(() => availableInputsForEdit(status, paid), [status, paid])

  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: validation,
    enableReinitialize: true,
  })
  const { values, errors, touched, setFieldValue, handleSubmit } = formik

  useEffect(() => {
    if (account) {
      setFieldValue('secToken', initialValues.secToken, false)
    }
  }, [setFieldValue, account])

  const { recordDate, secToken } = values

  const isRecordFuture = dayjs(recordDate)
    .local()
    .isSameOrAfter(dayjs(dayjs().local().format('YYYY-MM-DD')).local())

  const onValueChange = (key: string, value: any) => {
    setFieldValue(key, value, true)
  }

  const fetchAmountByRecordDate = async (secToken: any, recordDate: any) => {
    const isFuture = dayjs(recordDate)
      .local()
      .isSameOrAfter(dayjs(dayjs().local().format('YYYY-MM-DD')).local())

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
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <FormCard marginBottom="32px">
          <TYPE.title6 marginBottom="28px">
            <Trans>SECURITY TOKENS</Trans>
          </TYPE.title6>
          <FormGrid style={{ marginBottom: 20 }}>
            <Select
              tooltipText="Select the security token you want to distribute for this payout event"
              label="Security token"
              placeholder="Choose SEC token"
              selectedItem={values.secToken}
              items={secTokensOptions}
              onSelect={(newToken) => {
                onValueChange('secToken', newToken)
                fetchAmountByRecordDate(newToken, recordDate)
              }}
              error={touched.secToken ? errors.secToken : ''}
              required
              isDisabled={!availableForEditing.includes('secToken')}
            />
            <DateInput
              label="Record Date"
              placeholder="Choose record date"
              maxHeight={60}
              openTo="date"
              value={values.recordDate}
              maxDate={
                values.startDate
                  ? dayjs(values.startDate).subtract(1, 'days')
                  : values.endDate
                  ? dayjs(values.endDate).subtract(2, 'days')
                  : undefined
              }
              onChange={(newDate) => {
                onValueChange('recordDate', dayjs(newDate).local().format('YYYY-MM-DD'))
                fetchAmountByRecordDate(secToken, dayjs(newDate).local().format('YYYY-MM-DD'))
              }}
              error={touched.recordDate ? errors.recordDate : ''}
              required
              tooltipText="The record date or cut-off date is selected to determine which token holders (from when) can participate in the payout event."
              isDisabled={!availableForEditing.includes('recordDate')}
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
          status={status}
          isRecordFuture={isRecordFuture}
          onValueChange={onValueChange}
          totalSecTokenSum={tokenAmount.totalSum ?? 0}
          availableForEditing={availableForEditing}
        />
      </form>
    </FormikProvider>
  )
}
