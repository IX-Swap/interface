import { FormGrid } from 'pages/KYC/styleds'
import { FormWrapper, InputWithLabel, Label } from 'pages/Tenant/components/styleds'
import React from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'

interface WithdrawalDetailsProps {
  formik: any
}

const WithdrawalDetails: React.FC<WithdrawalDetailsProps> = ({ formik }) => {
  return (
    <>
      <h1 className="title">Withdrawal Details</h1>

      <Box>
        <FormGrid columns={2}>
          <FormWrapper>
            <Label htmlFor="network">Withdraw Fee</Label>

            <InputWithLabel
              placeholder="Withdraw Fee"
              id="withdrawFee"
              name="withdrawFee"
              value={formik.values.withdrawFee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.withdrawFee)}
            />
            {Boolean(formik.errors.withdrawFee) ? <ErrorText>{formik.errors.withdrawFee}</ErrorText> : null}
          </FormWrapper>
          <FormWrapper>
            <Label htmlFor="network">Withdraw Fee Address</Label>

            <InputWithLabel
              placeholder="Withdraw Fee Addresse"
              id="withdrawFeeAddress"
              name="withdrawFeeAddress"
              value={formik.values.withdrawFeeAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.withdrawFeeAddress)}
            />
            {Boolean(formik.errors.withdrawFeeAddress) ? (
              <ErrorText>{formik.errors.withdrawFeeAddress}</ErrorText>
            ) : null}
          </FormWrapper>
        </FormGrid>
      </Box>
    </>
  )
}

export default WithdrawalDetails

const ErrorText = styled.span`
  color: #f44336;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.36px;
`
