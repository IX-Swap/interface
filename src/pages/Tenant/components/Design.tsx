import React from 'react';
import ImageUpload from './ImageUpload';
import { FormWrapper, Label } from './styleds';
import ColorPicker from './ColorPicker';

interface DesignProps {
  formik: any;
}

const Design: React.FC<DesignProps> = ({ formik }) => {
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
            setFieldTouched={formik.setFieldTouched}
            error={formik.touched.logoUrl && formik.errors.logoUrl}
            value={formik.values.logoUrl}
          />
        </div>
        <div>
          <ImageUpload
            title="Favicon"
            name="faviconUrl"
            id="faviconUrl"
            description="Upload a 48 x 48 pixel ICO, PNG, GIF, or JPG to display in browser tabs."
            setFieldValue={formik.setFieldValue}
            setFieldTouched={formik.setFieldTouched}
            error={formik.touched.faviconUrl && formik.errors.faviconUrl}
            value={formik.values.faviconUrl}
          />
        </div>
        <div>
          <ImageUpload
            name="bannerImageUrl"
            id="bannerImageUrl"
            title="Banner Image"
            description="PNG, JPG, and SVG files only."
            setFieldValue={formik.setFieldValue}
            setFieldTouched={formik.setFieldTouched}
            error={formik.touched.bannerImageUrl && formik.errors.bannerImageUrl}
            value={formik.values.bannerImageUrl}
          />
        </div>

        <div>
          <Label htmlFor="colorButtonPrimary">Colors (Button Primary)</Label>
          <ColorPicker
            id="colorButtonPrimary"
            name="colorButtonPrimary"
            value={formik.values.colorButtonPrimary}
            setFieldValue={formik.setFieldValue}
          />
        </div>
      </FormWrapper>
    </>
  );
};

export default Design;