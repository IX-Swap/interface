import React, { useState } from 'react'
import { Button, Box, Avatar } from '@mui/material'
import styled from 'styled-components'

const Input = styled.input`
  display: none;
`

const StyledButton = styled(Button)`
  margin-top: 16px;
  text-transform: none;
`

const PreviewBox = styled(Box)`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PreviewImage = styled(Avatar)`
  width: 64px;
  height: 64px;
  border-radius: 8px;
`

const ImageUpload = () => {
  const [image, setImage] = useState<any>(null)

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <div>Upload Logo</div>
      <div>PNG, JPG, and SVG files only.</div>
      <label htmlFor="upload-button">
        <Input accept="image/*" id="upload-button" type="file" onChange={handleImageUpload} />
        <div>Browse</div>
      </label>
      {image && (
        <PreviewBox>
          <PreviewImage src={image} alt="Uploaded image" />
          <Button variant="text" color="secondary" onClick={() => setImage(null)}>
            Remove
          </Button>
        </PreviewBox>
      )}
    </>
  )
}

export default ImageUpload
