import React, { FC } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import * as yup from 'yup'
import { useFormik } from 'formik'

import { isValidAddress } from 'utils'
import { CloseIcon } from 'theme'
import { useModalOpen, useTokenPopupToggle } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { AddressInput } from 'components/AddressInputPanel/AddressInput'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import NetworkSelect from './NetworkSelect'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { blockchainNetworks } from 'pages/KYC/mock'
import Loader from 'components/Loader'

const networkSchema = yup
  .object({
    value: yup.string().required('Network value is required'),
    label: yup.string().required('Network label is required'),
    icon: yup.string().required(),
    chainId: yup.string().required(),
  })
  .nullable()

const schema = yup.object().shape({
  network: networkSchema.required('Network is required'),
  tokenAddress: yup
    .string()
    .required('Token Address is required')
    .test('isValidAddress', 'Token Address is invalid', (value) => {
      return !!isValidAddress(value || '') // Ensure the return is a boolean
    }),
})

interface Props {}

interface INetwork {
  value: string
  label: string
  icon: string
  chainId: string
}

interface IToken {
  network: INetwork | null
  tokenAddress: string
}

const initialValues: IToken = {
  network: null,
  tokenAddress: '',
}

export const TokenPopup: FC<Props> = () => {
  const isOpen = useModalOpen(ApplicationModal.TOKEN_POPUP)
  const toggle = useTokenPopupToggle()

  const formik = useFormik<IToken>({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values: any) => {
      try {
        formik.setSubmitting(true)
        console.log('values', values)
      } catch (e: any) {
      } finally {
        formik.setSubmitting(false)
      }
    },
  })

  const onChangeTokenAddress = (value: string) => {
    formik.setFieldValue('tokenAddress', value)
  }

  const onSelectNetwork = (value: any) => {
    debugger
    formik.setFieldValue('network', value)
  }

  return (
    <>
      <RedesignedWideModal isOpen={isOpen} onDismiss={() => {}}>
        <ModalBody>
          <CloseButton>
            <CloseIcon onClick={toggle} />
          </CloseButton>

          <Title>Add Token</Title>

          <FormWrapper>
            <Label htmlFor="network">Network</Label>

            <NetworkSelect
              id="network"
              name="network"
              placeholder="Choose Network"
              isClearable={false}
              isSearchable={false}
              options={blockchainNetworks}
              value={formik.values.network}
              onSelect={onSelectNetwork}
            />
            {Boolean(formik.errors.network) ? <ErrorText>{formik.errors.network}</ErrorText> : null}
          </FormWrapper>

          <FormWrapper>
            <Label htmlFor="tokenAddress">Contract Address</Label>
            <AddressInput
              id="tokenAddress"
              name="tokenAddress"
              value={formik.values.tokenAddress}
              onChange={onChangeTokenAddress}
              error={Boolean(formik.errors.tokenAddress)}
              placeholder="Contract Address"
              fontSize={14}
            />
            {Boolean(formik.errors.tokenAddress) ? <ErrorText>{formik.errors.tokenAddress}</ErrorText> : null}
          </FormWrapper>

          <Flex justifyContent="space-between" style={{ gap: 12, marginTop: 32 }}>
            <OutlineButton style={{ border: '1px solid #6666FF33', width: '100%' }} onClick={toggle}>
              Cancel
            </OutlineButton>

            <FilledButton
              style={{ width: '100%' }}
              type="submit"
              onClick={formik.submitForm}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <Loader size="18px" /> : null} Continue
            </FilledButton>
          </Flex>
        </ModalBody>
      </RedesignedWideModal>
    </>
  )
}

const ModalBody = styled.div`
  min-width: 420px;
  padding: 32px;
  position: relative;
`

const CloseButton = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
`

const Title = styled.h1`
  color: #292933;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
  text-align: left;
`

const Label = styled.label`
  color: #556;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
  padding-bottom: 12px;
  display: block;
`

const ErrorText = styled.span`
  color: #f44336;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.36px;
`

const FormWrapper = styled.div`
  margin-bottom: 20px;
`
