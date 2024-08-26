import React from 'react'
import { FormControlLabel, FormWrapper, TwoColumnGrid } from './styleds'
import { Checkbox } from '@mui/material'

interface PagesAndFeaturesProps {
  formik: any
}

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
                label={page}
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
