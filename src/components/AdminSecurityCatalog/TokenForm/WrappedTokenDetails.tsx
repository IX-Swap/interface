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
              placeholder="Tenant name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.name)}
            />
            {Boolean(formik.errors.network) ? <ErrorText>{formik.errors.network}</ErrorText> : null}
          </FormWrapper>
          <FormWrapper>
            <Label htmlFor="network">Wrapped Symbol</Label>

            <InputWithLabel
              placeholder="Tenant name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.name)}
            />
            {Boolean(formik.errors.network) ? <ErrorText>{formik.errors.network}</ErrorText> : null}
          </FormWrapper>

          <FormWrapper>
            <Label htmlFor="network">Wrapped Decimals</Label>

            <InputWithLabel
              placeholder="Tenant name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.name)}
            />
            {Boolean(formik.errors.network) ? <ErrorText>{formik.errors.network}</ErrorText> : null}
          </FormWrapper>
        </FormGrid>
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
