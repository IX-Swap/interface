import React, { useEffect, useMemo } from 'react'
import { useFormik, FormikProvider } from 'formik'
import dayjs from 'dayjs'
import { Select, TextInput } from 'pages/KYC/common'
import { FormGrid } from 'pages/KYC/styleds'
import CurrencyLogo from 'components/CurrencyLogo'
import { TYPE } from 'theme'
import { useUserState } from 'state/user/hooks'
import { useAddPopup } from 'state/application/hooks'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { usePayoutState } from 'state/payout/hooks'
import { availableInputsForEdit } from './utils'
import { initialValues } from './mock'
import { validation } from './validation'
import { useActiveWeb3React } from 'hooks/web3'
import { PayoutFormCard } from 'pages/CreatePayoutEvent/styleds'
import { AirdropEventBlock } from './AirdropEventBlock'
import { PAYOUT_STATUS } from 'constants/enums'

const START_DATE = dayjs.utc().format()
const END_DATE = dayjs().add(1, 'days').utc().format()

export const AirdropForm = () => {
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

  const addPopup = useAddPopup()

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

  const availableForEditing = useMemo(() => availableInputsForEdit(PAYOUT_STATUS.DRAFT), [])

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      recordDate: START_DATE,
      startDate: START_DATE,
      endDate: END_DATE,
    },
    onSubmit: () => {},
    validationSchema: validation,
    enableReinitialize: true,
  })

  const { values, errors, touched, setFieldValue, handleSubmit } = formik

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
              placeholder="security token"
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
        </PayoutFormCard>

        <AirdropEventBlock onValueChange={onValueChange} availableForEditing={availableForEditing} />
      </form>
    </FormikProvider>
  )
}
