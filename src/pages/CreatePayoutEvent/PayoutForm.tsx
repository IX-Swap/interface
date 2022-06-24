import React, { FC, useEffect, useState, useMemo } from 'react'
import { useFormik } from 'formik'
import { Trans } from '@lingui/macro'
import { useHistory } from 'react-router-dom'

import { Select } from 'pages/KYC/common'
import { DateInput } from 'components/DateInput'
import { getTotalAmountByRecordDate, useCreateDraftPayout, usePayoutState } from 'state/payout/hooks'
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
import { useWeb3React } from '@web3-react/core'

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
      history.push(`/payout/${data.id}`)
    } else {
    }
  }

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    isInitialValid: false,
  })

  useEffect(() => {
    if (account) {
      setFieldValue('secToken', initialValues.secToken, false)
    }
  }, [setFieldValue, account])

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
}
