import React, { FC, useEffect, useState, useMemo } from 'react'
import { useFormik, FormikProvider } from 'formik'
import { useHistory } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { Trans } from '@lingui/macro'

import dayjs from 'dayjs'

import { Select } from 'pages/KYC/common'
import { FormGrid } from 'pages/KYC/styleds'

import { DateInput } from 'components/DateInput'
import CurrencyLogo from 'components/CurrencyLogo'

import { TYPE } from 'theme'

import { useUserState } from 'state/user/hooks'
import { useAddPopup } from 'state/application/hooks'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import {
  getTotalAmountByRecordDate,
  useCreateDraftPayout,
  usePayoutState,
  useUpdateDraftPayout,
  useUpdatePayout,
} from 'state/payout/hooks'

import { routes } from 'utils/routes'
import { availableInputsForEdit, FormValues, transformPayoutDraftDTO } from './utils'

import { FormCard } from './styleds'
import { initialValues } from './mock'
import { validation } from './validation'

import { Summary } from './Summary'
import { PayoutEventBlock } from './PayoutEventBlock'
import { PAYOUT_STATUS } from 'constants/enums'

interface PayoutFormProps {
  payoutData?: Partial<FormValues>
  status?: PAYOUT_STATUS
  paid?: boolean
}

export const PayoutForm: FC<PayoutFormProps> = ({ payoutData, paid = false, status = PAYOUT_STATUS.DRAFT }) => {
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
    totalSum: 70,
  })
  const { error } = usePayoutState()
  const [isAmountLoading, setIsAmountLoading] = useState(false)

  const createDraft = useCreateDraftPayout()
  const updateDraft = useUpdateDraftPayout()
  const updatePayout = useUpdatePayout()

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

  const availableForEditing = useMemo(() => availableInputsForEdit(status, paid), [status, paid])

  const handleFormSubmit = async (values: any) => {
    const formattedValues = Object.entries(values).reduce((acc: Record<string, any>, [key, next]) => {
      if (availableForEditing.includes(key)) {
        acc[key] = next
      }
      return acc
    }, {})
    const body = transformPayoutDraftDTO(formattedValues)

    let data: any

    if (payoutData && status === PAYOUT_STATUS.DRAFT) {
      data = await updateDraft(+payoutData.id!, body, payoutData)
    } else if (payoutData) {
      data = await updatePayout(+payoutData.id!, body, payoutData)
    } else {
      data = await createDraft(body)
    }

    if (data?.id) {
      addPopup({
        info: {
          success: true,
          summary: `Payout was successfully ${payoutData ? 'updated' : 'created'}`,
        },
      })
      history.push({ pathname: routes.payoutItemManager(data.id) })
    } else {
    }
  }

  const formik = useFormik({
    initialValues: payoutData ?? initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: validation,
    enableReinitialize: true,
  })

  const { values, errors, touched, setFieldValue, handleSubmit } = formik
  const { recordDate, secToken } = values

  useEffect(() => {
    if (payoutData) {
      onValueChange('secToken', payoutData.secToken)
      fetchAmountByRecordDate(payoutData.secToken, recordDate)
    }
  }, [])

  useEffect(() => {
    if (account) {
      setFieldValue('secToken', payoutData?.secToken ?? initialValues.secToken, false)
    }
  }, [setFieldValue, account])

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
              tooltipText="Select the security token you want to distribute for this payout event."
              label="Security Token"
              placeholder="Choose security token"
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
          paid={paid}
          isEdit={!!payoutData}
          payoutId={payoutData?.id ? +payoutData.id : undefined}
        />
      </form>
    </FormikProvider>
  )
}
