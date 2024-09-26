import { FormGrid } from 'pages/KYC/styleds'
import React from 'react'
import styled from 'styled-components'
import { Checkbox, Switch } from '@mui/material'
import { FormControlLabel, Label } from 'pages/Tenant/components/styleds'

const kycTypeMapping = {
  individualAccredited: 'Individuals - Accredited Investors',
  individualAccreditedNot: 'Individuals - NOT Accredited Investors',
  corporateAccredited: 'Corporate - Accredited Investors',
  corporateAccreditedNot: 'Corporate - NOT Accredited Investors',
} as any

interface AvailabilityProps {
  formik: any
}

const Availability: React.FC<AvailabilityProps> = ({ formik }) => {
  return (
    <>
      <h1 className="title">Availability</h1>

      <FormGrid columns={2} style={{ marginTop: 24 }}>
        <div>
          <Options>
            {Object.keys(formik.values.kycType).map((item) => (
              <div key={item}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={`kycType.${item}`}
                      checked={formik.values.kycType[item]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  }
                  label={kycTypeMapping[item]}
                />
              </div>
            ))}
          </Options>
        </div>

        <Options>
          <FormControlLabel
            control={
              <Switch
                name="active"
                checked={formik.values.active}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            label={<Label>Active</Label>}
          />

          <FormControlLabel
            control={
              <Switch
                name="featured"
                checked={formik.values.featured}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            label={<Label>Featured</Label>}
          />

          <FormControlLabel
            control={
              <Switch
                name="allowWithdrawal"
                checked={formik.values.allowWithdrawal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            label={<Label>Allow Withdrawal</Label>}
          />

          <FormControlLabel
            control={
              <Switch
                name="allowDeposit"
                checked={formik.values.allowDeposit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            label={<Label>Allow Deposit</Label>}
          />
        </Options>
      </FormGrid>
    </>
  )
}

export default Availability

const ErrorText = styled.span`
  color: #f44336;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.36px;
`

const Options = styled.div`
  display: flex;
  flex-direction: column;
`

const LabelRadio = styled.div`
  color: #556;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
  margin-left: 10px;
`
