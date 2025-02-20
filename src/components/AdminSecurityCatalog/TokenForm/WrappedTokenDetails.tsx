import { FormGrid } from 'pages/KYC/styleds'
import { FormWrapper, InputWithLabel, Label } from 'pages/Tenant/components/styleds'
import React from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'

interface WrappedTokenDetailsProps {
  formik: any
}

const WrappedTokenDetails: React.FC<WrappedTokenDetailsProps> = ({ formik }) => {
  return (
    <>
      <h1 className="title">Wrapped Token Details</h1>

      <Box>
        <FormGrid columns={3}>
          <FormWrapper>
            <Label htmlFor="network">Wrapped Token Name</Label>

            <InputWithLabel
              disabled
              placeholder="Wrapped Token Name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.name)}
            />
          </FormWrapper>
          <FormWrapper>
            <Label htmlFor="symbol">Wrapped Symbol</Label>

            <InputWithLabel
              disabled
              placeholder="Wrapped Symbol"
              id="symbol"
              name="symbol"
              value={formik.values.symbol}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.symbol)}
            />
          </FormWrapper>

          <FormWrapper>
            <Label htmlFor="network">Wrapped Decimals</Label>

            <InputWithLabel
              disabled
              placeholder="Wrapped Decimals"
              id="decimals"
              name="decimals"
              value={formik.values.decimals}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.decimals)}
            />
          </FormWrapper>
        </FormGrid>

        {formik?.values?.wrappedTokenAddress ? (
          <FormGrid columns={2}>
            <FormWrapper>
              <Label htmlFor="network">Wrapped Token Address</Label>

              <InputWithLabel
                placeholder="Wrap Token Address"
                id="wrappedTokenAddress"
                name="wrappedTokenAddress"
                disabled
                value={formik.values.wrappedTokenAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.errors.wrappedTokenAddress)}
              />
            </FormWrapper>
          </FormGrid>
        ) : null}
      </Box>
    </>
  )
}

export default WrappedTokenDetails

const ErrorText = styled.span`
  color: #f44336;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.36px;
`
