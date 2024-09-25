import { FormGrid } from 'pages/KYC/styleds'
import { FormWrapper, InputWithLabel, Label } from 'pages/Tenant/components/styleds'
import React from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'

interface CustodyDetailsProps {
  formik: any
}

const CustodyDetails: React.FC<CustodyDetailsProps> = ({ formik }) => {
  return (
    <>
      <h1 className="title">Custody Details</h1>

      <Box>
        <FormGrid columns={2}>
          <FormWrapper>
            <Label htmlFor="network">Custody Vault ID</Label>

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
            <Label htmlFor="network">Custody Asset ID</Label>

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

        <FormGrid columns={1}>
          <FormWrapper>
            <Label htmlFor="network">Custody Asset Address</Label>

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

export default CustodyDetails

const ErrorText = styled.span`
  color: #f44336;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.36px;
`
