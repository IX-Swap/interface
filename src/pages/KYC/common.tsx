import React, { CSSProperties, FC, HTMLProps, ReactChildren } from 'react'
import { Box, Flex } from 'rebass'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'
import { FileWithPath } from 'react-dropzone'

import { Input } from 'components/Input'
import { ButtonGradient } from 'components/Button'
import { TYPE, EllipsisText } from 'theme'
import { Label } from 'components/Label'
import Upload from 'components/Upload'
import { FilePreview } from 'components/FilePreview'
import { GradientText } from 'pages/CustodianV2/styleds'
import { Select as ReactSelect } from 'components/Select'

import { ReactComponent as UploadLogo } from 'assets/images/upload.svg'
import { ReactComponent as InfoLogo } from 'assets/images/info-filled.svg'
import { ReactComponent as CrossIcon } from 'assets/images/cross.svg'
import { UploaderCard, FormGrid, BeneficialOwnersTableContainer } from './styleds'
import { AcceptFiles } from 'components/Upload/types'

export interface UploaderProps {
  files: FileWithPath[]
  onDrop: (file: any) => void
  title: string
  subtitle?: string | JSX.Element
  optional?: boolean
  error?: any | ReactChildren
  handleDeleteClick: (index: number) => void
  required?: boolean
}

interface SelectProps {
  onSelect: (item: any) => void
  selectedItem: any
  items: any[]
  label?: string
  withScroll?: boolean
  placeholder?: string
  style?: CSSProperties
  error?: any | ReactChildren
  onBlur?: (e: any) => void
  name?: string
  isMulti?: boolean
  required?: boolean
}

type TextInputProps = HTMLProps<HTMLInputElement> & {
  error?: any | ReactChildren
  required?: boolean
}

export const Select: FC<SelectProps> = ({
  label,
  onSelect,
  selectedItem,
  placeholder,
  items,
  error,
  name,
  required,
}: SelectProps) => {
  return (
    <Box>
      {label && <Label required={required} text={label} />}
      <ReactSelect
        name={name}
        placeholder={placeholder}
        onSelect={onSelect}
        value={selectedItem}
        options={items}
        error={error}
      />
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
  required,
  error = false,
}: TextInputProps) => {
  return (
    <Box>
      {label && <Label text={label} htmlFor={name || ''} required={required} />}

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
  files,
  required,
  error,
  handleDeleteClick,
  onDrop,
  optional = false,
}: UploaderProps) => {
  return (
    <Box>
      <Flex>
        <Label text={title} required={required} />
        {optional && (
          <>
            <TYPE.body1 marginLeft="4px" marginRight="8px" color={`text9`}>
              (optional)
            </TYPE.body1>
            <InfoLogo />
          </>
        )}
      </Flex>
      {subtitle && <StyledDescription marginBottom="10px">{subtitle}</StyledDescription>}
      {files.length > 0 && (
        <Flex flexWrap="wrap">
          {files.map((file: any, index) => (
            <FilePreview
              key={`file-${index}-${file.name}`}
              file={file?.asset ? file.asset : file}
              index={1}
              handleDeleteClick={() => {
                handleDeleteClick(index)
              }}
              style={{ marginRight: index !== files.length - 1 ? 16 : 0 }}
            />
          ))}
        </Flex>
      )}
      <Upload accept={`${AcceptFiles.IMAGE},${AcceptFiles.PDF}` as AcceptFiles} file={null} onDrop={onDrop}>
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
      {error && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
    </Box>
  )
}

interface ChooseFileTypes {
  label?: string | JSX.Element | null
  file: FileWithPath | null
  onDrop: (file: FileWithPath) => void
  error?: any
  handleDeleteClick: () => void
}

export const ChooseFile = ({ label, file, onDrop, error, handleDeleteClick }: ChooseFileTypes) => {
  return (
    <Box style={{ maxWidth: 200 }}>
      {label && <Label text={label} />}
      {file ? (
        <FilePreview file={file} index={1} handleDeleteClick={handleDeleteClick} withBackground={false} />
      ) : (
        <Upload file={file} onDrop={onDrop}>
          <ButtonGradient type="button" style={{ height: 52, padding: '7px 16px' }}>
            <EllipsisText>{(file as any)?.name || <Trans>Choose File</Trans>}</EllipsisText>
          </ButtonGradient>
        </Upload>
      )}
      {error && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
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
    <BeneficialOwnersTableContainer>
      <FormGrid columns={4}>
        <Label text={t`Full Name`} />
        <Label text={t`% Shareholding`} />
        <Label text={t`Proof of Address`} />
        <Label text={t`Proof of Identity`} />
      </FormGrid>
    </BeneficialOwnersTableContainer>
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
  height: 60px;
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
