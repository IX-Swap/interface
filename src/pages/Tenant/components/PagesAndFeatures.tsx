import React from 'react'
import { FormControlLabel, FormWrapper, TwoColumnGrid } from './styleds'
import { Checkbox } from '@mui/material'

interface PagesAndFeaturesProps {
  // Define the props for the component here
}

const PagesAndFeatures: React.FC<PagesAndFeaturesProps> = () => {
  // Implement the component logic here

  return (
    <div>
      <h1 className="title">Pages</h1>
      <FormWrapper>
        <TwoColumnGrid>
          <div>
            <FormControlLabel control={<Checkbox />} label="KYC" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Issuance" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Corporate KYC" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Issuance / Create" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Individual KYC" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Issuance / Create / Vetting" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Swap" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Issuance / Create / Information" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Security Tokens" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Issuance / View / Vetting" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Pool" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Issuance / Edit / Information" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Launchpad" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Issuance / Review / Information" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Offers" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Issuance / Extract" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Admin" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Issuance / Manage" />
          </div>
        </TwoColumnGrid>
      </FormWrapper>
      <h1 className="title" style={{ marginTop: 24, paddingTop: 24, borderTop: 'solid 1px #E6E6FF' }}>
        Features
      </h1>
      <FormWrapper>
        <TwoColumnGrid>
          <div>
            <FormControlLabel control={<Checkbox />} label="Featured Security Vaults" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="LBP" />
          </div>
        </TwoColumnGrid>
      </FormWrapper>
    </div>
  )
}

export default PagesAndFeatures
