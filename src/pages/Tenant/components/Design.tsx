import React from 'react'
import ImageUpload from './ImageUpload'
import { FormWrapper } from './styleds'

interface DesignProps {
  // Define the props for the Design component here
}

const Design: React.FC<DesignProps> = () => {
  // Implement the component logic here

  return (
    <>
      <h1 className="title">Design</h1>
      <FormWrapper>
        <div>
          <ImageUpload title="Logo" description="PNG, JPG, and SVG files only." />
        </div>
        <div>
          <ImageUpload
            title="Favicon"
            description="Upload a 48 x 48 pixel ICO, PNG, GIF, or JPG to display in browser tabs."
          />
        </div>
        <div>
          <ImageUpload title="Banner Image" description="PNG, JPG, and SVG files only." />
        </div>
      </FormWrapper>
    </>
  )
}

export default Design
