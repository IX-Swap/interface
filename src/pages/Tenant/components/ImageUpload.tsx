import React, { useRef, useState } from 'react'
import { Button, Box } from '@mui/material'
import styled, { css } from 'styled-components'
import { Flex } from 'rebass'

import { ReactComponent as UploadLogoLbp } from 'assets/images/Browse.svg'
import { ReactComponent as TrashNoBorder } from 'assets/images/TrashNoBorder.svg'

interface ImageUploadProps {
  title: string
  description: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ title, description }) => {
  const fileInputRef = useRef<any>(null)
  const [image, setImage] = useState<any>(null)
  const [imageName, setImageName] = useState('')

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImage(url)
      setImageName(file.name)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setImageName('')
    fileInputRef.current.value = null
  }

  return (
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

        <label htmlFor={title}>
          <Input accept="image/*" id={title} type="file" ref={fileInputRef} onChange={handleImageUpload} />
          <BrowserButton>Browse</BrowserButton>
        </label>
      </Container>
      {image && (
        <PreviewBox>
          <FileNameLink onClick={() => window.open(image, '_blank')}>{imageName}</FileNameLink>

          <Button
            variant="text"
            color="secondary"
            onClick={handleRemoveImage}
            style={{ width: 'fit-content', minWidth: 'unset' }}
          >
            <TrashNoBorder style={{ cursor: 'pointer' }} />
          </Button>
        </PreviewBox>
      )}
    </div>
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
