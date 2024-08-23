import React from 'react'
import ImageUpload from './ImageUpload'

interface DesignProps {
  // Define the props for the Design component here
}

const Design: React.FC<DesignProps> = () => {
  // Implement the component logic here

  return (
    <>
      <h1 className="title">Design</h1>
      <ImageUpload />
    </>
  )
}

export default Design
