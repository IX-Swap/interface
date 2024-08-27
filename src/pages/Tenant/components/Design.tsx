import React from 'react'
import ImageUpload from './ImageUpload'
import { FormWrapper } from './styleds'

interface DesignProps {
  formik: any
}

const Design: React.FC<DesignProps> = ({ formik }) => {
  // Implement the component logic here

  return (
    <>
      <h1 className="title">Design</h1>
      <FormWrapper>
        <div>
          <ImageUpload
            title="Logo"
            name="logoUrl"
            id="logoUrl"
            description="PNG, JPG, and SVG files only."
            setFieldValue={formik.setFieldValue}
            error={formik.errors.logoUrl}
          />
        </div>
        <div>
          <ImageUpload
            title="Favicon"
            name="faviconUrl"
            id="faviconUrl"
            description="Upload a 48 x 48 pixel ICO, PNG, GIF, or JPG to display in browser tabs."
            setFieldValue={formik.setFieldValue}
            error={formik.errors.faviconUrl}
          />
        </div>
        <div>
          <ImageUpload
            name="bannerImageUrl"
            id="bannerImageUrl"
            title="Banner Image"
            description="PNG, JPG, and SVG files only."
            setFieldValue={formik.setFieldValue}
            error={formik.errors.bannerImageUrl}
          />
        </div>
      </FormWrapper>
    </>
  )
}

export default Design
