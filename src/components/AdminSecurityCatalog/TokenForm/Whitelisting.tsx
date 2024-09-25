import { FormControlLabel, Switch } from '@mui/material'
import { FormGrid } from 'pages/KYC/styleds'
import { FormWrapper, InputWithLabel, Label } from 'pages/Tenant/components/styleds'
import React from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'

interface WhitelistingProps {
  formik: any
}

const Whitelisting: React.FC<WhitelistingProps> = ({ formik }) => {
  return (
    <>
      <Box>
        <FormControlLabel
          control={
            <Switch
              name="enableLaunchpadBanner"
              checked={formik.values.enableLaunchpadBanner}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          }
          label={<Label>Whitelisting</Label>}
        />

        <FormGrid columns={2}>
          <FormWrapper>
            <Label htmlFor="network">Whitelist Platform</Label>

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
            <Label htmlFor="network">Whitelist Contract Address</Label>

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

export default Whitelisting

const ErrorText = styled.span`
  color: #f44336;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.36px;
`
