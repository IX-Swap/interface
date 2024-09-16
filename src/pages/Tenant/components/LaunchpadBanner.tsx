import React from 'react'
import styled from 'styled-components'
import { FormControlLabel, Switch } from '@mui/material'
import { FormWrapper, InputWithLabel, TwoColumnGrid } from './styleds'

interface LaunchpadBannerProps {
  formik: any
}

const LaunchpadBanner: React.FC<LaunchpadBannerProps> = ({ formik }) => {
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            name="enableLaunchpadBanner"
            checked={formik.values.enableLaunchpadBanner}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        }
        label={<Label>Launchpad Banner</Label>}
      />

      {formik.values.enableLaunchpadBanner ? (
        <FormWrapper style={{ marginTop: 24 }}>
          <div>
            <LabelSmall htmlFor="launchpadBannerTitle">Launchpad Banner Title</LabelSmall>
            <InputWithLabel
              placeholder="Launchpad Banner Title"
              id="launchpadBannerTitle"
              name="launchpadBannerTitle"
              value={formik.values.launchpadBannerTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.launchpadBannerTitle)}
            />
          </div>

          <TwoColumnGrid>
            <div>
              <LabelSmall htmlFor="launchpadBannerInfoRedirectTitle">Launchpad Banner Info Redirect Title</LabelSmall>
              <InputWithLabel
                placeholder="Launchpad Banner Info Redirect Title"
                id="launchpadBannerInfoRedirectTitle"
                name="launchpadBannerInfoRedirectTitle"
                value={formik.values.launchpadBannerInfoRedirectTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.errors.launchpadBannerInfoRedirectTitle)}
              />
            </div>
            <div>
              <LabelSmall htmlFor="launchpadBannerInfoRedirectUrl">Launchpad Banner Info Redirect URL</LabelSmall>
              <InputWithLabel
                placeholder="Launchpad Banner Info Redirect URL"
                id="launchpadBannerInfoRedirectUrl"
                name="launchpadBannerInfoRedirectUrl"
                value={formik.values.launchpadBannerInfoRedirectUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.errors.launchpadBannerInfoRedirectUrl)}
              />
            </div>
          </TwoColumnGrid>
        </FormWrapper>
      ) : null}
    </>
  )
}

export default LaunchpadBanner

const Label = styled.label`
  color: #292933;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 26px */
  letter-spacing: -0.6px;
`

export const LabelSmall = styled.label`
  color: #556;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;

  .desc {
    color: #8f8fb2;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.36px;
  }
`
