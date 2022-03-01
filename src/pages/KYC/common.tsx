import React, { CSSProperties, FC, HTMLProps, ReactChildren } from 'react'
import { Box, Flex } from 'rebass'
import { Trans } from '@lingui/macro'
import { Label } from '@rebass/forms'
import styled from 'styled-components'
import { FileWithPath } from 'react-dropzone'

import { Input } from 'components/Input'
import { ButtonGradient } from 'components/Button'
import { TYPE, EllipsisText } from 'theme'
import Upload from 'components/Upload'
import { Dropdown } from 'components/AdminSecurityCatalog/Dropdown'
import { GradientText } from 'pages/CustodianV2/styleds'

import { ReactComponent as UploadLogo } from 'assets/images/upload.svg'
import { ReactComponent as InfoLogo } from 'assets/images/info-filled.svg'
import { ReactComponent as CrossIcon } from 'assets/images/cross.svg'
import { UploaderCard, FormGrid } from './styleds'
import { AcceptFiles } from 'components/Upload/types'

export interface UploaderProps {
  file: FileWithPath | null
  onDrop: (file: any) => void
  title: string
  subtitle: string | JSX.Element
  optional?: boolean
  error?: any | ReactChildren
}

interface SelectProps {
  onSelect: (item: any) => void
  selectedItem: any
  items: any[]
  label: string
  withScroll?: boolean
  placeholder?: string
  style?: CSSProperties
  error?: any | ReactChildren
  onBlur?: (e: any) => void
  name?: string
}

type TextInputProps = HTMLProps<HTMLInputElement> & {
  error?: any | ReactChildren
}

export const Select: FC<SelectProps> = ({
  label,
  onSelect,
  selectedItem,
  withScroll,
  items,
  onBlur,
  error,
  name,
}: SelectProps) => {
  return (
    <Box>
      <Label marginBottom="11px">
        <TYPE.title11 color="text2">
          <Trans>{label}</Trans>
        </TYPE.title11>
      </Label>
      <DropdownContainer>
        <Dropdown
          name={name}
          onBlur={onBlur}
          placeholder=" "
          withScroll={withScroll}
          onSelect={onSelect}
          selectedItem={selectedItem}
          items={items}
        />
      </DropdownContainer>
      {error && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
    </Box>
  )
}

export const TextInput: FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  style,
  name,
  type,
  onBlur,
  error = false,
}: TextInputProps) => {
  return (
    <Box>
      {label && (
        <Label marginBottom="11px" htmlFor={name || ''}>
          <TYPE.title11 color="text2">
            <Trans>{label}</Trans>
          </TYPE.title11>
        </Label>
      )}

      <StyledInput
        onBlur={onBlur}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={style}
        type={type}
        autoComplete="off"
      />

      {error && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
    </Box>
  )
}

export const Uploader: FC<UploaderProps> = ({
  title,
  subtitle,
  file,
  onDrop,
  error,
  optional = false,
}: UploaderProps) => {
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
      <StyledDescription marginBottom="10px">{subtitle}</StyledDescription>
      <Upload accept={AcceptFiles.ALL} file={file} onDrop={onDrop}>
        <UploaderCard>
          {file ? (
            <TYPE.body1>{file.name}</TYPE.body1>
          ) : (
            <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ maxWidth: 100 }}>
              <UploadLogo />
              <TYPE.small textAlign="center" marginTop="8px" color={'text9'}>
                Drag and Drop
              </TYPE.small>
              <TYPE.small display="flex" textAlign="center" color={'text9'}>
                or <GradientText style={{ marginLeft: 2 }}>Upload</GradientText>
              </TYPE.small>
            </Flex>
          )}
        </UploaderCard>
      </Upload>
      {error && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
    </Box>
  )
}

interface ChooseFileTypes {
  label?: string | JSX.Element
  file: FileWithPath | null
  onDrop: (file: FileWithPath) => void
}

export const ChooseFile = ({ label, file, onDrop }: ChooseFileTypes) => {
  return (
    <Box>
      {label && (
        <Label marginBottom="11px">
          <TYPE.title11 color="text2">
            <Trans>{label}</Trans>
          </TYPE.title11>
        </Label>
      )}
      <Upload file={file} onDrop={onDrop}>
        <ButtonGradient style={{ height: 52, padding: '7px 16px' }}>
          <EllipsisText>{file?.name || <Trans>Choose File</Trans>}</EllipsisText>
        </ButtonGradient>
      </Upload>
    </Box>
  )
}

interface BeneficialOwnersTableTypes {
  data: Array<{
    fullName: string
    shareholding: string
    proofOfAddress: FileWithPath | null
    proofOfIdentity: FileWithPath | null
  }>
}

export const BeneficialOwnersTable = ({}: BeneficialOwnersTableTypes) => {
  return (
    <FormGrid columns={4} style={{ marginTop: 20 }}>
      <Label marginBottom="11px">
        <TYPE.title11 color="text2">
          <Trans>Full Name</Trans>
        </TYPE.title11>
      </Label>
      <Label marginBottom="11px">
        <TYPE.title11 color="text2">
          <Trans>% Shareholding</Trans>
        </TYPE.title11>
      </Label>
      <Label marginBottom="11px">
        <TYPE.title11 color="text2">
          <Trans>Proof of Address</Trans>
        </TYPE.title11>
      </Label>
      <Label marginBottom="11px">
        <TYPE.title11 color="text2">
          <Trans>Proof of Identity</Trans>
        </TYPE.title11>
      </Label>
    </FormGrid>
  )
}

interface DeleteRowTypes {
  children: JSX.Element
  onClick: () => void
}

export const DeleteRow = ({ children, onClick }: DeleteRowTypes) => {
  return (
    <DeleteRowContainer>
      <DeleteIcon onClick={onClick}>
        <CrossIcon />
      </DeleteIcon>
      <DeleteRowChildren>{children}</DeleteRowChildren>
    </DeleteRowContainer>
  )
}

const DropdownContainer = styled.div`
  > div {
    background-color: ${({ theme: { bg12 } }) => `${bg12}40`};
  }
`

const StyledDescription = styled(TYPE.description3)`
  color: ${({ theme: { text2 } }) => `${text2}50`};
  ul {
    margin: 0;
    padding-left: 20px;
    font-size: 12px;
    > li:not(:last-child) {
      margin-bottom: 8px;
    }
  }
  li {
    line-height: 18px;
  }
`

const StyledInput = styled(Input)`
  padding: 10px 21px;
  border-radius: 36px;
  font-weight: normal;
  font-size: 16px;
  background-color: ${({ theme: { bg12 } }) => `${bg12}40`};
  :focus {
    background-color: ${({ theme: { bg7 } }) => bg7};
  }
`

const DeleteRowContainer = styled.div`
  position: relative;
`

const DeleteRowChildren = styled.div`
  input {
    padding-left: 52px;
  }
`

const DeleteIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme: { bg7 } }) => bg7};
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border-radius: 36px 0 0 36px;
  cursor: pointer;
`
