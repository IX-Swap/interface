import React, { useRef, useState } from 'react'
import { Button, Box } from '@mui/material'
import styled, { css } from 'styled-components'
import { Flex } from 'rebass'

import { ReactComponent as UploadLogoLbp } from 'assets/images/Browse.svg'
import { ReactComponent as TrashNoBorder } from 'assets/images/TrashNoBorder.svg'
import apiService from 'services/apiService'
import { ErrorText } from './styleds'

interface ImageUploadProps {
  title: string
  description: string
  id: string
  name: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  error?: string
  value?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ title, description, id, name, error, value, setFieldValue }) => {
  const fileInputRef = useRef<any>(null)
  const [image, setImage] = useState<any>(null)
  const [imageName, setImageName] = useState('')

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImage(url)
      setImageName(file.name)
      const data = new FormData()
      data.append('file', file)

      try {
        const result = await apiService.post('/storage/batch', data)
        if (result.status === 201 && result.data) {
          const id = result.data['file']

          const responseImage = await apiService.get(`/storage/file/public/metadata/${id}`)
          if (responseImage.status === 200 && responseImage.data) {
            const imageUrl = responseImage.data.public
            setFieldValue(name, imageUrl, true)
            setImage(imageUrl)
          } else {
            console.error('Failed to retrieve image metadata:', responseImage)
            setFieldValue(name, '', true)
          }
        } else {
          console.error('Image upload failed:', result)
          setFieldValue(name, '', true)
        }
      } catch (error) {
        console.error('Error during image upload process:', error)
        setFieldValue(name, '', true)
      }
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setImageName('')
    fileInputRef.current.value = null
    setFieldValue(name, '')
  }

  return (
    <>
      <div>
        <Container>
          <Flex alignItems="center">
            <WrapIconUpload>
              <StyledUploadLogoLbp />
            </WrapIconUpload>
            <div>
              <Name>{title}</Name>
              <Description>{description}</Description>
            </div>
          </Flex>

          <label htmlFor={id}>
            <Input accept="image/*" id={id} name={name} type="file" ref={fileInputRef} onChange={handleImageUpload} />
            <BrowserButton>Browse</BrowserButton>
          </label>
        </Container>
        {image || value ? (
          <PreviewBox>
            <FileNameLink onClick={() => window.open(image || value, '_blank')}>{imageName || name}</FileNameLink>

            <Button
              variant="text"
              color="secondary"
              onClick={handleRemoveImage}
              style={{ width: 'fit-content', minWidth: 'unset' }}
            >
              <TrashNoBorder style={{ cursor: 'pointer' }} />
            </Button>
          </PreviewBox>
        ) : null}
      </div>

      {error ? <ErrorText>{error}</ErrorText> : null}
    </>
  )
}

export default ImageUpload

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const WrapIconUpload = styled.div`
  border-radius: 6px;
  border: solid 1px #e6e6ff;
  background: #fff;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`

const Name = styled.div`
  color: #556;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
`

const Description = styled.div`
  color: #8f8fb2;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.36px;
  margin-top: 4px;
`

const StyledUploadLogoLbp = styled(UploadLogoLbp)`
  ${({ theme }) =>
    theme.config.elements?.main &&
    css`
      path {
        stroke: ${theme.config.elements?.main};
        fill: none;
      }
    `}
`

const Input = styled.input`
  display: none;
`

const BrowserButton = styled.div`
  color: #66f;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.28px;
  cursor: pointer;
`

const PreviewBox = styled(Box)`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FileNameLink = styled.div`
  color: #66f;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.28px;
  cursor: pointer;
  text-decoration: underline;
`
