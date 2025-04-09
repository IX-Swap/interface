import { Checkbox } from '@mui/material'
import React from 'react'
import { FormWrapper, Label, InputWithLabel, TwoColumnGrid, FormControlLabel, ErrorText } from './styleds'

interface GeneralInfoProps {
  formik: any
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ formik }) => {
  return (
    <>
      <h1 className="title">General Info</h1>

      <FormWrapper>
        <div>
          <Label htmlFor="tenant-name">Tenant name</Label>
          <InputWithLabel
            placeholder="Tenant name"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
          {formik.touched.name && formik.errors.name ? <ErrorText>{formik.errors.name}</ErrorText> : null}
        </div>

        <div>
          <Label htmlFor="title">Title</Label>
          <InputWithLabel
            id="title"
            placeholder="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
          />
          {formik.touched.title && formik.errors.title ? <ErrorText>{formik.errors.title}</ErrorText> : null}
        </div>

        <TwoColumnGrid>
          <div>
            <Label htmlFor="domain">Domain</Label>
            <InputWithLabel
              id="domain"
              placeholder="Domain"
              name="domain"
              value={formik.values.domain}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.domain && Boolean(formik.errors.domain)}
            />
            {formik.touched.domain && formik.errors.domain ? <ErrorText>{formik.errors.domain}</ErrorText> : null}
          </div>

          <div>
            <Label htmlFor="app-url">App URL</Label>
            <InputWithLabel
              id="app-url"
              placeholder="App URL"
              name="appUrl"
              value={formik.values.appUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.appUrl && Boolean(formik.errors.appUrl)}
            />
            {formik.touched.appUrl && formik.errors.appUrl ? <ErrorText>{formik.errors.appUrl}</ErrorText> : null}
          </div>
        </TwoColumnGrid>

        <div>
          <Label htmlFor="description">
            Description <br /> <span className="desc">Provide description. Min 100, Max 2000 characters.</span>
          </Label>
          <InputWithLabel
            id="description"
            placeholder="Description"
            multiline
            rows={3}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
          />
          {formik.touched.description && formik.errors.description ? (
            <ErrorText>{formik.errors.description}</ErrorText>
          ) : null}
        </div>

        <div>
          <FormControlLabel
            control={
              <Checkbox
                id="isIxSwap"
                name="isIxSwap"
                checked={formik.values.isIxSwap}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            label="IXS Tenant"
          />
        </div>
      </FormWrapper>
    </>
  )
}

export default GeneralInfo
