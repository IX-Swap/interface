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
            <Label htmlFor="custodyVaultId">Custody Vault ID</Label>

            <InputWithLabel
              placeholder="Custody Vault ID"
              id="custodyVaultId"
              name="custodyVaultId"
              value={formik.values.custodyVaultId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.custodyVaultId)}
            />
          </FormWrapper>
          <FormWrapper>
            <Label htmlFor="network">Custody Asset ID</Label>

            <InputWithLabel
              placeholder="Custody Asset ID"
              id="custodyAssetId"
              name="custodyAssetId"
              value={formik.values.custodyAssetId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.custodyAssetId)}
            />
          </FormWrapper>
        </FormGrid>

        <FormGrid columns={1}>
          <FormWrapper>
            <Label htmlFor="custodyAssetAddress">Custody Asset Address</Label>

            <InputWithLabel
              placeholder="Custody Asset Address"
              id="custodyAssetAddress"
              name="custodyAssetAddress"
              value={formik.values.custodyAssetAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.custodyAssetAddress)}
            />
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
