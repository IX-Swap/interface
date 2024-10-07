import { FormControlLabel, Switch } from '@mui/material'
import { FormGrid } from 'pages/KYC/styleds'
import { FormWrapper, InputWithLabel, Label } from 'pages/Tenant/components/styleds'
import React, { useEffect } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'
import StyledSelect from '../StyledSelect'

interface WhitelistingProps {
  formik: any
  platforms: any
}

const Whitelisting: React.FC<WhitelistingProps> = ({ formik, platforms }) => {
  useEffect(() => {
    const value = formik?.values?.whitelistPlatform?.value

    if (value === 'investax') {
      formik.setFieldValue('whitelistContractAddress', formik.values.originalAddress)
      formik.setFieldValue('whitelistFunction', 'addToWhitelist')
    } else if (value === 'ixswap') {
      formik.setFieldValue('whitelistContractAddress', '')
      formik.setFieldValue('whitelistFunction', 'addWhitelistInvestor')
    }
  }, [JSON.stringify(formik.values.whitelistPlatform)])

  return (
    <>
      <Box>
        <FormControlLabel
          control={
            <Switch
              name="needsWhitelisting"
              checked={formik.values.needsWhitelisting}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          }
          label={<Label>Whitelisting</Label>}
        />

        {formik.values.needsWhitelisting ? (
          <FormGrid columns={2}>
            <FormWrapper>
              <Label htmlFor="network">Whitelist Platform</Label>

              <StyledSelect
                id="whitelistPlatform"
                name="whitelistPlatform"
                placeholder="Select Whitelist Platform"
                isClearable={false}
                isSearchable={false}
                options={platforms}
                value={formik.values.whitelistPlatform}
                onSelect={(value) => formik.setFieldValue('whitelistPlatform', value)}
              />
              {Boolean(formik.errors.whitelistPlatform) ? (
                <ErrorText>{formik.errors.whitelistPlatform}</ErrorText>
              ) : null}
            </FormWrapper>
            <FormWrapper>
              <Label htmlFor="network">Whitelist Contract Address</Label>

              <InputWithLabel
                placeholder="Whitelist Contract Address"
                id="whitelistContractAddress"
                name="whitelistContractAddress"
                value={formik.values.whitelistContractAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.errors.whitelistContractAddress)}
              />
              {Boolean(formik.errors.whitelistContractAddress) ? (
                <ErrorText>{formik.errors.whitelistContractAddress}</ErrorText>
              ) : null}
            </FormWrapper>
          </FormGrid>
        ) : null}
      </Box>
    </>
  )
}

export default Whitelisting

const ErrorText = styled.span`
  color: #f44336;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.36px;
`
