import React from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'

import { Line } from 'components/Line'
import { UploaderLBP } from 'pages/KYC/common'
import { FormGrid } from 'pages/KYC/styleds'
import { FormWrapper, InputWithLabel, Label } from 'pages/Tenant/components/styleds'
import { industries, countries } from '../mock'
import StyledSelect from '../StyledSelect'
import { blockchainNetworks } from 'pages/KYC/mock'

interface GeneralInfoProps {
  formik: any
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ formik }) => {
  const handleDropImage = (acceptedFile: any, key: string) => {
    formik.setFieldValue(key, acceptedFile)
  }

  const handleImageDelete = (key: string) => {
    formik.setFieldValue(key, null)
  }

  return (
    <>
      <h1 className="title">General Info</h1>

      <Box mt={3}>
        <FormGrid columns={1}>
          <div>
            <UploaderLBP
              name="logo"
              showLabel={false}
              title="Logo"
              files={formik.values.logo ? [formik.values.logo] : []}
              handleDeleteClick={() => handleImageDelete('logo')}
              onDrop={(file) => {
                handleDropImage(file, 'logo')
              }}
            />
            {Boolean(formik.errors.logo) ? <ErrorText>{formik.errors.logo}</ErrorText> : null}
          </div>
        </FormGrid>

        <FormGrid columns={2}>
          <FormWrapper>
            <Label htmlFor="network">Company Name</Label>

            <InputWithLabel
              placeholder="Company Name"
              id="companyName"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.companyName)}
            />
            {Boolean(formik.errors.companyName) ? <ErrorText>{formik.errors.companyName}</ErrorText> : null}
          </FormWrapper>
          <FormWrapper>
            <Label htmlFor="network">URL</Label>

            <InputWithLabel
              placeholder="Official Website"
              id="url"
              name="url"
              value={formik.values.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.url)}
            />
            {Boolean(formik.errors.url) ? <ErrorText>{formik.errors.url}</ErrorText> : null}
          </FormWrapper>
        </FormGrid>

        <FormGrid columns={2}>
          <FormWrapper>
            <Label htmlFor="industry">Industry</Label>

            <StyledSelect
              id="industry"
              name="industry"
              placeholder="Select Industry"
              isClearable={false}
              isSearchable={false}
              options={industries.map((industry) => ({ value: industry.id, label: industry.name }))}
              value={formik.values.industry}
              onSelect={(value) => formik.setFieldValue('industry', value)}
            />
            {Boolean(formik.errors.industry) ? <ErrorText>{formik.errors.industry}</ErrorText> : null}
          </FormWrapper>
          <FormWrapper>
            <Label htmlFor="network">Country</Label>

            <StyledSelect
              id="country"
              name="country"
              placeholder="Select Country"
              isClearable={false}
              isSearchable={false}
              options={countries}
              value={formik.values.country}
              onSelect={(value) => formik.setFieldValue('country', value)}
            />
            {Boolean(formik.errors.country) ? <ErrorText>{formik.errors.country}</ErrorText> : null}
          </FormWrapper>
        </FormGrid>

        <FormGrid columns={1}>
          <FormWrapper>
            <Label htmlFor="description">
              Description <br /> <span className="desc">Provide description. Min 100, Max 2000 characters.</span>
            </Label>
            <InputWithLabel
              id="description"
              placeholder="Description"
              multiline
              rows={3}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.description)}
            />
            {Boolean(formik.errors.description) ? <ErrorText>{formik.errors.description}</ErrorText> : null}
          </FormWrapper>
        </FormGrid>

        <Line style={{ marginTop: '32px', marginBottom: '12px' }} />

        <FormGrid columns={3}>
          <FormWrapper>
            <Label htmlFor="originalName">Token Name</Label>

            <InputWithLabel
              placeholder="Token name"
              id="originalName"
              name="originalName"
              disabled
              value={formik.values.originalName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.originalName)}
            />
          </FormWrapper>
          <FormWrapper>
            <Label htmlFor="originalSymbol">Symbol</Label>

            <InputWithLabel
              placeholder="Symbol"
              id="originalSymbol"
              name="originalSymbol"
              disabled
              value={formik.values.originalSymbol}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.originalSymbol)}
            />
          </FormWrapper>

          <FormWrapper>
            <Label htmlFor="originalDecimals">Decimals</Label>

            <InputWithLabel
              placeholder="Decimals"
              id="originalDecimals"
              name="originalDecimals"
              disabled
              value={formik.values.originalDecimals}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.originalDecimals)}
            />
          </FormWrapper>
        </FormGrid>

        <FormGrid columns={2}>
          <FormWrapper>
            <Label htmlFor="network">Original Network</Label>

            <StyledSelect
              id="originalNetwork"
              name="originalNetwork"
              isDisabled
              placeholder="Choose Network"
              isClearable={false}
              isSearchable={false}
              options={blockchainNetworks}
              value={formik.values.originalNetwork}
              onSelect={(value) => formik.setFieldValue('originalNetwork', value)}
            />
          </FormWrapper>
          <FormWrapper>
            <Label htmlFor="network">Token Address</Label>

            <InputWithLabel
              placeholder="Token Address"
              id="originalAddress"
              name="originalAddress"
              disabled
              value={formik.values.originalAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.originalAddress)}
            />
          </FormWrapper>
        </FormGrid>
      </Box>
    </>
  )
}

export default GeneralInfo

const LoadingIndicator = styled.div`
  align-content: center;
  justify-self: center;
`

const ErrorText = styled.span`
  color: #f44336;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.36px;
`
