import React from 'react'
import { Formik, FormikProps } from 'formik'
import { Plus } from 'react-feather'
import { Box } from 'rebass'
import { useTheme } from 'styled-components'

import { ShortFormBody } from 'components/LaunchpadIssuance/IssuanceForm/shared/styled'
import { IssuanceTextField } from 'components/LaunchpadIssuance/utils/TextField'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { Centered, ErrorText, Row } from 'components/LaunchpadMisc/styled'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { useAppSelector } from 'state/hooks'
import { useWhitelistWallet } from 'state/issuance/hooks'
import { initialValues, placeholders } from './constants'
import { schema } from './validationSchema'

export interface WhitelistWalletFormValues {
  walletAddress: string
  fullName: string
}

export interface WhitelistFormProps {
  offerId: string
  onSuccess: () => void
}

export const WhitelistForm = ({ offerId, onSuccess: callback }: WhitelistFormProps) => {
  const form = React.useRef<FormikProps<WhitelistWalletFormValues>>(null)
  const theme = useTheme()
  const onSuccess = () => {
    callback()
    form.current?.resetForm()
  }
  const whitelistWallet = useWhitelistWallet({ onSuccess })
  const { loadingSave, saveError } = useAppSelector((state) => state.issuance)

  const submit = (values: WhitelistWalletFormValues) => {
    whitelistWallet(offerId, values)
  }

  return (
    <Formik innerRef={form} initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
      {({ values, errors, setFieldValue, submitForm }) => (
        <>
          <ShortFormBody>
            <IssuanceTextField
              label="Wallet Address"
              placeholder={placeholders.walletAddress}
              value={values.walletAddress}
              onChange={(v) => setFieldValue('walletAddress', v)}
              error={errors.walletAddress}
              maxLength={64}
            />
            <IssuanceTextField
              label="Full Name"
              placeholder={placeholders.fullName}
              value={values.fullName}
              onChange={(v) => setFieldValue('fullName', v)}
              error={errors.fullName}
            />
            <Row>
              <Box width="0.5">
                {!loadingSave && (
                  <OutlineButton
                    style={{ border: '1px solid #6666FF33' }}
                    onClick={submitForm}
                    padding="0 1.5rem"
                    disabled={!values.fullName || !values.walletAddress}
                  >
                    <Plus size="15" color={theme.launchpad.colors.primary} />
                    <span style={{ fontWeight: 600 }}> Add Wallet</span>
                  </OutlineButton>
                )}
                {loadingSave && (
                  <Centered>
                    <Loader />
                  </Centered>
                )}
              </Box>
            </Row>
          </ShortFormBody>
          {saveError && <ErrorText>{saveError}</ErrorText>}
        </>
      )}
    </Formik>
  )
}
