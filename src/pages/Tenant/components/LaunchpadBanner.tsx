import React from 'react'
import styled from 'styled-components'
import { FormControlLabel, Switch } from '@mui/material'
import { InputWithLabel, TwoColumnGrid } from './styleds'

interface LaunchpadBannerProps {
  formik: any
}

const LaunchpadBanner: React.FC<LaunchpadBannerProps> = ({ formik }) => {
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={formik.values.enableLaunchpadBanner}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        }
        label={<Label>Launchpad Banner</Label>}
      />

      <>
        <div>
          <Label htmlFor="launchpadBannerTitle">Launchpad Banner Title</Label>
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
            <Label htmlFor="launchpadBannerInfoRedirectTitle">Launchpad Banner Info Redirect Title</Label>
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
            <Label htmlFor="launchpadBannerInfoRedirectUrl">Launchpad Banner Info Redirect URL</Label>
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
      </>
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
