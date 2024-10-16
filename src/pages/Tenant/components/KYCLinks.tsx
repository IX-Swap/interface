import React from 'react';
import { ErrorText, FormWrapper, InputWithLabel, Label, TwoColumnGrid } from './styleds';

interface KYCLinksProps {
  formik: any;
}

const KYCLinks: React.FC<KYCLinksProps> = ({ formik }) => {
  return (
    <>
      <h1 className="title">KYC Links</h1>

      <FormWrapper>
        <TwoColumnGrid>
          <div>
            <Label htmlFor="kycSuccessRedirectUrl">Success Redirect URL</Label>
            <InputWithLabel
              id="kycSuccessRedirectUrl"
              placeholder="Success Redirect URL"
              name="kycSuccessRedirectUrl"
              value={formik.values.kycSuccessRedirectUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.kycSuccessRedirectUrl && Boolean(formik.errors.kycSuccessRedirectUrl)}
            />
            {formik.touched.kycSuccessRedirectUrl && formik.errors.kycSuccessRedirectUrl ? (
              <ErrorText>{formik.errors.kycSuccessRedirectUrl}</ErrorText>
            ) : null}
          </div>

          <div>
            <Label htmlFor="kycCancelRedirectUrl">Cancel Redirect URL</Label>
            <InputWithLabel
              id="kycCancelRedirectUrl"
              placeholder="Cancel Redirect URL"
              name="kycCancelRedirectUrl"
              value={formik.values.kycCancelRedirectUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.kycCancelRedirectUrl && Boolean(formik.errors.kycCancelRedirectUrl)}
            />
            {formik.touched.kycCancelRedirectUrl && formik.errors.kycCancelRedirectUrl ? (
              <ErrorText>{formik.errors.kycCancelRedirectUrl}</ErrorText>
            ) : null}
          </div>
        </TwoColumnGrid>
      </FormWrapper>
    </>
  );
};

export default KYCLinks;