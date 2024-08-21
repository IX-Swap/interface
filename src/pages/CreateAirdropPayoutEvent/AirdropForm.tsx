import React, { FC, useEffect, useState, useMemo } from 'react'
import { useFormik, FormikProvider } from 'formik'
import { useHistory } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { Select, TextInput } from 'pages/KYC/common'
import { FormGrid } from 'pages/KYC/styleds'
import CurrencyLogo from 'components/CurrencyLogo'
import { TYPE } from 'theme'
import { useUserState } from 'state/user/hooks'
import { useAddPopup } from 'state/application/hooks'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { useCreateDraftPayout, usePayoutState, useUpdateDraftPayout, useUpdatePayout } from 'state/payout/hooks'
import { routes } from 'utils/routes'
import { availableInputsForEdit, FormValues, transformPayoutDraftDTO } from './utils'
import { initialValues } from './mock'
import { validation } from './validation'
// import { Summary } from './Summary'
// import { PayoutEventBlock } from './PayoutEventBlock'
import { PAYOUT_STATUS } from 'constants/enums'
import { useActiveWeb3React } from 'hooks/web3'
import { PayoutFormCard } from 'pages/CreatePayoutEvent/styleds'
import { AirdropEventBlock } from './AirdropEventBlock'

interface AirdropFormProps {
  payoutData?: Partial<FormValues>
  status?: PAYOUT_STATUS
  paid?: boolean
}

export const AirdropForm: FC<AirdropFormProps> = ({ payoutData, paid = false, status = PAYOUT_STATUS.DRAFT }) => {
  const { account } = useWeb3React()
  const { me } = useUserState()
  const { chainId } = useActiveWeb3React()

  const secTokensOptions = useMemo(() => {
    if (me?.managerOf?.length) {
      return me.managerOf.map(({ token }) => ({
        isDisabled: token?.chainId !== chainId,
        label: token?.symbol,
        value: token?.id,
        icon: token ? <CurrencyLogo currency={new WrappedTokenInfo(token)} /> : null,
      }))
    }
    return []
  }, [me])


  const { error } = usePayoutState()

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
      data = await updateDraft(Number(payoutData?.id), body, payoutData)
    } else if (payoutData) {
      data = await updatePayout(Number(payoutData?.id), body, payoutData)
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

  useEffect(() => {
    if (payoutData) {
      onValueChange('secToken', payoutData.secToken)
    }
  }, [])

  useEffect(() => {
    if (account) {
      setFieldValue('secToken', payoutData?.secToken ?? initialValues.secToken, false)
    }
  }, [setFieldValue, account])

  const onValueChange = (key: string, value: any) => {
    setFieldValue(key, value, true)
  }

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <PayoutFormCard marginBottom="32px">
          <TYPE.body fontWeight="600" marginBottom="28px">
            Security Tokens
          </TYPE.body>
          <FormGrid style={{ marginBottom: 20 }}>
            <Select
              tooltipText="Select the security token you want to distribute for this payout event."
              label="Security Token"
              placeholder=" security token"
              selectedItem={values.secToken}
              items={secTokensOptions}
              onSelect={(newToken) => {
                onValueChange('secToken', newToken)
              }}
              error={touched.secToken ? errors.secToken : ''}
              required
              isDisabled={!availableForEditing.includes('secToken')}
            />

            <TextInput
              placeholder="Provide a name for this payout event"
              label="Event Name"
              onChange={(e: any) => onValueChange('title', e.currentTarget.value)}
              value={values.title}
              required
              error={touched.title ? errors.title : ''}
              tooltipText="Select a name for this payout event. Note that this will be the title of this payout that your token holders can use as a reference."
              disabled={!availableForEditing.includes('title')}
            />
          </FormGrid>

          {/* <Summary
            isRecordFuture={isRecordFuture}
            isLoading={isAmountLoading}
            tokenAmount={tokenAmount}
            setTokenAmount={setTokenAmount}
            onValueChange={onValueChange}
          /> */}
        </PayoutFormCard>

        <AirdropEventBlock
          status={status}
          onValueChange={onValueChange}
          availableForEditing={availableForEditing}
          paid={paid}
          isEdit={!!payoutData}
          payoutId={payoutData?.id ? +payoutData.id : undefined}
        />
      </form>
    </FormikProvider>
  )
}
