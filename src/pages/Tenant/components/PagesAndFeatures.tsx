import React from 'react'
import { FormControlLabel, FormWrapper, TwoColumnGrid } from './styleds'
import { Checkbox } from '@mui/material'

interface PagesAndFeaturesProps {
  formik: any
}

const PagesMapping = {
  admin: 'Admin Dashboard',
  dex: 'DEX',
  offer: 'Launchpad',
  lbp: 'LBP',
  issuance: 'Issuance Dashboard',
  kyc: 'KYC',
  securityTokens: 'RWA',
  payout: 'Payout',
  lbpAdmin: 'LBP Dashboard',
} as any

const PagesAndFeatures: React.FC<PagesAndFeaturesProps> = ({ formik }) => {
  // Implement the component logic here

  return (
    <div>
      <h1 className="title">Pages</h1>
      <FormWrapper>
        <TwoColumnGrid>
          {Object.keys(formik.values.pages).map((page) => (
            <div key={page}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={`pages.${page}`}
                    checked={formik.values.pages[page]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
                label={PagesMapping[page]}
              />
            </div>
          ))}
        </TwoColumnGrid>
      </FormWrapper>
      <h1 className="title" style={{ marginTop: 24, paddingTop: 24, borderTop: 'solid 1px #E6E6FF' }}>
        Features
      </h1>
      <FormWrapper>
        <TwoColumnGrid>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  id="enableFeaturedSecurityVaults"
                  name="enableFeaturedSecurityVaults"
                  checked={formik.values.enableFeaturedSecurityVaults}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label="Featured Security Vaults"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  id="enableLbp"
                  name="enableLbp"
                  checked={formik.values.enableLbp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label="LBP"
            />
          </div>
        </TwoColumnGrid>
      </FormWrapper>
    </div>
  )
}

export default PagesAndFeatures
