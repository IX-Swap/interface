import React, { ChangeEventHandler, CSSProperties, FC } from 'react'
import { Box, Flex } from 'rebass'
import { Trans } from '@lingui/macro'
import { Label } from '@rebass/forms'
import { FileWithPath } from 'react-dropzone'

import { ContainerRow, Input, InputContainer, InputPanel } from 'components/Input'
import { TYPE } from 'theme'
import Upload from 'components/Upload'
import { Dropdown } from 'components/AdminSecurityCatalog/Dropdown'
import { GradientText } from 'pages/CustodianV2/styleds'

import { ReactComponent as UploadLogo } from 'assets/images/upload.svg'
import { ReactComponent as InfoLogo } from 'assets/images/info-filled.svg'
import { UploaderCard } from './styleds'

export interface UploaderProps {
  file: FileWithPath | null
  onDrop: (file: any) => void
  title: string
  subtitle: string
  optional?: boolean
}

interface SelectProps {
  onSelect: (item: any) => void
  selectedItem: any
  items: any[]
  label: string
  withScroll?: boolean
  placeholder?: string
  style?: CSSProperties
}

interface TextInputProps {
  label: string
  value: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const Select: FC<SelectProps> = ({ label, onSelect, selectedItem, withScroll, items }: SelectProps) => {
  return (
    <Box>
      <Label marginBottom="11px">
        <TYPE.title11 color="text2">
          <Trans>{label}</Trans>
        </TYPE.title11>
      </Label>
      <Dropdown placeholder=" " withScroll={withScroll} onSelect={onSelect} selectedItem={selectedItem} items={items} />
    </Box>
  )
}

export const TextInput: FC<TextInputProps> = ({ label, value, onChange }: TextInputProps) => {
  return (
    <Box>
      <Label marginBottom="11px" htmlFor="issuer-name">
        <TYPE.title11 color="text2">
          <Trans>{label}</Trans>
        </TYPE.title11>
      </Label>
      <InputPanel>
        <ContainerRow>
          <InputContainer>
            <Input value={value} onChange={onChange} />
          </InputContainer>
        </ContainerRow>
      </InputPanel>
      {/* {issuerErrors.name && (
          <TYPE.small marginTop="4px" color={'red1'}>
            {issuerErrors.name}
          </TYPE.small>
        )} */}
    </Box>
  )
}

export const Uploader: FC<UploaderProps> = ({ title, subtitle, file, onDrop, optional = false }: UploaderProps) => {
  return (
    <Box>
      <Flex marginBottom="10px">
        <TYPE.body1>{title}</TYPE.body1>
        {optional && (
          <>
            <TYPE.body1 marginLeft="4px" marginRight="8px" color={`text9`}>
              (optional)
            </TYPE.body1>
            <InfoLogo />
          </>
        )}
      </Flex>
      <TYPE.description3 marginBottom="10px">{subtitle}</TYPE.description3>
      <Upload file={file} onDrop={onDrop}>
        <UploaderCard>
          <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ maxWidth: 100 }}>
            <UploadLogo />
            <TYPE.small textAlign="center" marginTop="8px" color={'text9'}>
              Drag and Drop
            </TYPE.small>
            <TYPE.small display="flex" textAlign="center" color={'text9'}>
              or <GradientText style={{ marginLeft: 2 }}>Upload</GradientText>
            </TYPE.small>
          </Flex>
        </UploaderCard>
      </Upload>
    </Box>
  )
}
