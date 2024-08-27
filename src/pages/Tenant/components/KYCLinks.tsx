import React from 'react'
import { ErrorText, FormWrapper, InputWithLabel, Label, TwoColumnGrid } from './styleds'

interface KYCLinksProps {
  formik: any
}

const KYCLinks: React.FC<KYCLinksProps> = ({ formik }) => {
  return (
    <>
      <h1 className="title">KYC Links</h1>

      <FormWrapper>
        <TwoColumnGrid>
          <div>
            <Label htmlFor="complyCubeSuccessRedirectUrl">Success Redirect URL</Label>
            <InputWithLabel
              id="complyCubeSuccessRedirectUrl"
              placeholder="Success Redirect URL"
              name="complyCubeSuccessRedirectUrl"
              value={formik.values.complyCubeSuccessRedirectUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.complyCubeSuccessRedirectUrl)}
            />
            {Boolean(formik.errors.complyCubeSuccessRedirectUrl) ? (
              <ErrorText>{formik.errors.complyCubeSuccessRedirectUrl}</ErrorText>
            ) : null}
          </div>

          <div>
            <Label htmlFor="complyCubeCancelRedirectUrl">Cancel Redirect URL</Label>
            <InputWithLabel
              id="complyCubeCancelRedirectUrl"
              placeholder="Cancel Redirect URL"
              name="complyCubeCancelRedirectUrl"
              value={formik.values.complyCubeCancelRedirectUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.complyCubeCancelRedirectUrl)}
            />
            {Boolean(formik.errors.complyCubeCancelRedirectUrl) ? (
              <ErrorText>{formik.errors.complyCubeCancelRedirectUrl}</ErrorText>
            ) : null}
          </div>
        </TwoColumnGrid>
      </FormWrapper>
    </>
  )
}

export default KYCLinks
