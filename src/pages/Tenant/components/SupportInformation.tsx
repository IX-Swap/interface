import React from 'react'
import { ErrorText, FormWrapper, InputWithLabel, Label } from './styleds'

interface SupportInformationProps {
  formik: any
}

const SupportInformation: React.FC<SupportInformationProps> = ({ formik }) => {
  return (
    <>
      <h1 className="title">Support Information</h1>

      <FormWrapper>
        <div>
          <Label htmlFor="defaultUrl">Default URL</Label>
          <InputWithLabel
            id="defaultUrl"
            placeholder="Default URL"
            name="defaultUrl"
            value={formik.values.defaultUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.defaultUrl && Boolean(formik.errors.defaultUrl)}
          />
          {formik.touched.defaultUrl && formik.errors.defaultUrl ? (
            <ErrorText>{formik.errors.defaultUrl}</ErrorText>
          ) : null}
        </div>

        <div>
          <Label htmlFor="chartsUrl">Charts URL</Label>
          <InputWithLabel
            id="chartsUrl"
            placeholder="Charts URL"
            name="chartsUrl"
            value={formik.values.chartsUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.chartsUrl && Boolean(formik.errors.chartsUrl)}
          />
          {formik.touched.chartsUrl && formik.errors.chartsUrl ? (
            <ErrorText>{formik.errors.chartsUrl}</ErrorText>
          ) : null}
        </div>

        <div>
          <Label htmlFor="supportEmail">Support Email</Label>
          <InputWithLabel
            id="supportEmail"
            placeholder="Support Email"
            name="supportEmail"
            value={formik.values.supportEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.supportEmail && Boolean(formik.errors.supportEmail)}
          />
          {formik.touched.supportEmail && formik.errors.supportEmail ? (
            <ErrorText>{formik.errors.supportEmail}</ErrorText>
          ) : null}
        </div>
      </FormWrapper>
    </>
  )
}

export default SupportInformation
