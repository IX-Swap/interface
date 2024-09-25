import { Line } from 'components/Line'
import Loader from 'components/Loader'
import { MAX_FILE_UPLOAD_SIZE, MAX_FILE_UPLOAD_SIZE_ERROR } from 'constants/constants'
import { UploaderLBP } from 'pages/KYC/common'
import { FormGrid } from 'pages/KYC/styleds'
import { FormWrapper, InputWithLabel, Label } from 'pages/Tenant/components/styleds'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Box } from 'rebass'
import { useShowError } from 'state/application/hooks'
import styled from 'styled-components'

interface GeneralInfoProps {
  formik: any
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ formik }) => {
  const [values, setValues] = useState<any>({
    LBPLogo: null,
    LBPBanner: null,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({
    LBPLogo: false,
    LBPBanner: false,
  })
  const [errorLogo, setErrorLogo] = useState<string>('')
  const [errorBanner, setErrorBanner] = useState<string>('')

  const showError = useShowError()

  const handleDropImage = (acceptedFile: any, key: string) => {
    const setError = key === 'LBPLogo' ? setErrorLogo : setErrorBanner

    if (acceptedFile?.size > MAX_FILE_UPLOAD_SIZE) {
      showError(MAX_FILE_UPLOAD_SIZE_ERROR)
      setError(MAX_FILE_UPLOAD_SIZE_ERROR)
    } else if (values[key]) {
      showError('You can only upload one image at a time.')
      setError('You can only upload one image at a time.')
    } else {
      const updatedValues = { ...values, [key]: acceptedFile }
      setValues(updatedValues)
      // onChange(updatedValues)
      setError('')
    }
  }

  const handleImageDelete = (key: string) => {
    const updatedValues = { ...values, [key]: null }
    setValues(updatedValues)
    // onChange(updatedValues)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    const { value } = e.target
    const updatedValues = { ...values, [name]: value }
    setValues(updatedValues)
    // onChange(updatedValues)
  }

  const handleTouch = (key: string) => {
    setTouched((prevTouched) => ({ ...prevTouched, [key]: true }))
  }

  return (
    <>
      <h1 className="title">General Info</h1>

      <Box mt={3}>
        <FormGrid columns={2}>
          {!loading ? (
            <div>
              <UploaderLBP
                name="logo"
                showLabel={false}
                onChange={(e) => handleInputChange(e, 'LBPLogo')}
                title="Mini Logo"
                files={values.LBPLogo ? [values.LBPLogo] : []}
                handleDeleteClick={() => handleImageDelete('LBPLogo')}
                onDrop={(file) => {
                  handleDropImage(file, 'LBPLogo')
                  handleTouch('LBPLogo')
                }}
              />
              {errorLogo ? (
                <ErrorText>{errorLogo}</ErrorText>
              ) : (
                touched.LBPLogo && values.LBPLogo === null && <ErrorText>Please upload a logo</ErrorText>
              )}
            </div>
          ) : (
            <LoadingIndicator>
              <Loader />
            </LoadingIndicator>
          )}
          {!loading ? (
            <div>
              <UploaderLBP
                name="banner"
                showLabel={false}
                onChange={(e) => handleInputChange(e, 'LBPBanner')}
                title="Logo"
                files={values.LBPBanner ? [values.LBPBanner] : []}
                handleDeleteClick={() => handleImageDelete('LBPBanner')}
                onDrop={(file) => {
                  handleDropImage(file, 'LBPBanner')
                  handleTouch('LBPBanner')
                }}
              />
              {errorBanner ? (
                <ErrorText>{errorBanner}</ErrorText>
              ) : (
                touched.LBPBanner && values.LBPBanner === null && <ErrorText>Please upload a banner</ErrorText>
              )}
            </div>
          ) : (
            <LoadingIndicator>
              <Loader />
            </LoadingIndicator>
          )}
        </FormGrid>

        <FormGrid columns={2}>
          <FormWrapper>
            <Label htmlFor="network">Company Name</Label>

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
            <Label htmlFor="network">URL</Label>

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

        <FormGrid columns={2}>
          <FormWrapper>
            <Label htmlFor="network">Industry</Label>

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
            <Label htmlFor="network">Country</Label>

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
          </FormWrapper>
        </FormGrid>

        <Line style={{ marginTop: '32px', marginBottom: '12px' }} />

        <FormGrid columns={3}>
          <FormWrapper>
            <Label htmlFor="network">Token Name</Label>

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
            <Label htmlFor="network">Symbol</Label>

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
            <Label htmlFor="network">Decimals</Label>

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

        <FormGrid columns={2}>
          <FormWrapper>
            <Label htmlFor="network">Original Network</Label>

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
            <Label htmlFor="network">Token Address</Label>

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
