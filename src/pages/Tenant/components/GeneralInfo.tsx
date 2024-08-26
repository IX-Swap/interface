import { Checkbox } from '@mui/material'
import React from 'react'
import { FormWrapper, Label, InputWithLabel, TwoColumnGrid, FormControlLabel } from './styleds'

interface GeneralInfoProps {
  formik: any
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ formik }) => {
  console.log(formik)
  return (
    <>
      <h1 className="title">General Info</h1>

      <FormWrapper>
        <div>
          <Label htmlFor="tenant-name">Tenant name</Label>
          <InputWithLabel
            placeholder="Tenant name"
            fullWidth
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            // helperText={formik.touched.email && formik.errors.email}
          />
        </div>

        <div>
          <Label htmlFor="title">Title</Label>
          <InputWithLabel id="title" placeholder="Title" />
        </div>

        <TwoColumnGrid>
          <div>
            <Label htmlFor="domain">Domain</Label>
            <InputWithLabel id="domain" placeholder="Domain" />
          </div>

          <div>
            <Label htmlFor="app-url">App URL</Label>
            <InputWithLabel id="app-url" placeholder="App URL" />
          </div>
        </TwoColumnGrid>

        <div>
          <Label htmlFor="description">
            Description <br /> <span className="desc">Provide description. Min 100, Max 2000 characters.</span>
          </Label>
          <InputWithLabel id="description" multiline rows={3} placeholder="Description" />
        </div>

        <div>
          <FormControlLabel control={<Checkbox />} label="IX Swap Tenant" />
        </div>
      </FormWrapper>
    </>
  )
}

export default GeneralInfo
