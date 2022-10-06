import React, { CSSProperties, FC, HTMLProps, useMemo } from 'react'
import { Box, Flex } from 'rebass'
import styled, { css } from 'styled-components'
import { t, Trans } from '@lingui/macro'
import { FileWithPath } from 'react-dropzone'

import { Input, Textarea } from 'components/Input'
import { ButtonGradient } from 'components/Button'
import { TYPE, EllipsisText } from 'theme'
import { Label } from 'components/Label'
import Upload from 'components/Upload'
import { FilePreview } from 'components/FilePreview'
import { GradientText } from 'pages/CustodianV2/styleds'
import { Select as ReactSelect } from 'components/Select'
import { AcceptFiles } from 'components/Upload/types'

import { ReactComponent as UploadLogo } from 'assets/images/upload.svg'
import { ReactComponent as InfoLogo } from 'assets/images/info-filled.svg'
import { ReactComponent as CrossIcon } from 'assets/images/cross.svg'
import { ReactComponent as InvalidFormInputIcon } from 'assets/svg/invalid-form-input-icon.svg'

import { UploaderCard, FormGrid, BeneficialOwnersTableContainer } from './styleds'
import Row from 'components/Row'

export interface UploaderProps {
  files: FileWithPath[]
  onDrop: (file: any) => void
  title: string
  subtitle?: string | JSX.Element
  optional?: boolean
  error?: any | JSX.Element
  handleDeleteClick: (index: number) => void
  required?: boolean
  tooltipText?: string | JSX.Element
  isDisabled?: boolean
  id?: any
}

interface SelectProps {
  onSelect: (item: any) => void
  selectedItem: any
  items: any[]
  label?: string
  withScroll?: boolean
  placeholder?: string
  style?: CSSProperties
  error?: any | JSX.Element
  onBlur?: (e: any) => void
  name?: string
  isMulti?: boolean
  required?: boolean
  isDisabled?: boolean
  isClearable?: boolean
  tooltipText?: string | JSX.Element
  addCustom?: boolean
  id?: any
  value?: any
}

type TextInputProps = HTMLProps<HTMLInputElement | HTMLTextAreaElement> & {
  error?: any | JSX.Element
  required?: boolean
  tooltipText?: string | JSX.Element
}

interface KycInputLabelProps {
  name?: string
  error?: any
  label?: string
  tooltipText?: string | JSX.Element
  style?: string
}

export const KycInputLabel: FC<KycInputLabelProps> = ({label, error, name, tooltipText}) => {
  if (!label) {
    return null
  }

  return (
    <Row alignItems='center'>
      {error && (
        <div>
          <InvalidFormInputIcon style={{ margin: '0 0.5rem'}} />
        </div>
      )}
      <div>
        <Label label={label} htmlFor={name || ''}  tooltipText={tooltipText} color={error && "#FF007F"}  />
      </div>
    </Row>
  )
}

export const Select: FC<SelectProps> = ({
  id,
  label,
  onSelect,
  selectedItem,
  placeholder,
  items,
  error,
  name,
  required,
  tooltipText,
  isDisabled,
  ...rest
}: SelectProps) => {
  return (
    <Box>
      {label && <Label required={isDisabled ? false : required} label={label} tooltipText={tooltipText} />}
      {isDisabled && selectedItem ? (
        <Row alignItems="center" style={{ columnGap: 4 }}>
          {selectedItem?.icon}
          {selectedItem?.label}
        </Row>
      ) : (
        <ReactSelect
          name={name}
          placeholder={placeholder}
          onSelect={onSelect}
          id={id}
          value={selectedItem}
          options={items}
          error={error}
          isDisabled={isDisabled}
          {...rest}
        />
      )}
      {error && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
    </Box>
  )
}

export const KycSelect: FC<SelectProps> = ({
  id,
  label,
  onSelect,
  selectedItem,
  placeholder,
  items,
  error,
  name,
  required,
  tooltipText,
  isDisabled,
  ...rest
}: SelectProps) => {
  return (
    <Box>
      <KycInputLabel label={label} tooltipText={tooltipText} error={error} />
      {isDisabled && selectedItem ? (
        <Row alignItems="center" style={{ columnGap: 4 }}>
          {selectedItem?.icon}
          {selectedItem?.label}
        </Row>
      ) : (
        <ReactSelect
          name={name}
          id={id}
          placeholder={placeholder}
          onSelect={onSelect}
          value={selectedItem}
          options={items}
          error={error}
          isDisabled={isDisabled}
          {...rest}
        />
      )}
    </Box>
  )
}

export const TextInput: FC<TextInputProps> = ({
  id,
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
  tooltipText,
  disabled = false,
}: TextInputProps) => {
  return (
    <Box>
      {label && (
        <Label label={label} htmlFor={name || ''} required={disabled ? false : required} tooltipText={tooltipText} />
      )}

      {disabled && value ? (
        <div>{value}</div>
      ) : (
        <StyledInput
          data-testid={id}
          onBlur={onBlur}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={style}
          type={type}
          autoComplete="off"
          disabled={disabled}
        />
      )}

      {error && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
    </Box>
  )
}

export const KycTextInput: FC<TextInputProps> = ({
  id,
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
  tooltipText,
  disabled = false,
}: TextInputProps) => {
  return (
    <Box>
      <KycInputLabel name={name} label={label} error={error} tooltipText={tooltipText} />

      {disabled && value ? (
        <div>{value}</div>
      ) : (
        <StyledInput
          onBlur={onBlur}
          name={name}
          placeholder={placeholder}
          data-testid={id}
          value={value}
          onChange={onChange}
          style={style}
          type={type}
          autoComplete="off"
          disabled={disabled}
          error={error}
        />
      )}
    </Box>
  )
}

export const TextareaInput: FC<TextInputProps> = ({
  label,
  value,
  id,
  onChange,
  placeholder,
  style,
  name,
  required,
  error = false,
  tooltipText,
  disabled = false,
}: TextInputProps) => {
  return (
    <Box>
      {label && (
        <Label label={label} htmlFor={name || ''} required={disabled ? false : required} tooltipText={tooltipText} />
      )}

      {disabled && value ? (
        <div>{value}</div>
      ) : (
        <Textarea placeholder={placeholder} value={value} style={style} onChange={onChange} disabled={disabled} />
      )}

      {error && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
    </Box>
  )
}

export const Uploader: FC<UploaderProps> = ({
  id,
  title,
  subtitle,
  files,
  required,
  error,
  handleDeleteClick,
  onDrop,
  optional = false,
  tooltipText,
  isDisabled = false,
}: UploaderProps) => {
  return (
    <Box>
      <Flex>
        <Label label={title} required={required} tooltipText={tooltipText} />
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
      {files && files.length > 0 && (
        <Flex flexWrap="wrap">
          {files.map((file: any, index) => (
            <FilePreview
              key={`file-${index}-${file.name}`}
              file={file?.asset ? file.asset : file}
              index={1}
              handleDeleteClick={() => {
                handleDeleteClick(index)
              }}
              isDisabled={isDisabled}
              style={{ marginRight: index !== files.length - 1 ? 16 : 0 }}
            />
          ))}
        </Flex>
      )}
      {!isDisabled && (
        <Upload
          isDisabled={isDisabled}
          accept={`${AcceptFiles.IMAGE},${AcceptFiles.PDF}` as AcceptFiles}
          data-testid={id}
          file={null}
          onDrop={onDrop}
        >
          <UploaderCard>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ maxWidth: 100 }}>
              <StyledUploadLogo />
              <TYPE.small textAlign="center" marginTop="8px" color={'text9'}>
                Drag and Drop
              </TYPE.small>
              <TYPE.small display="flex" textAlign="center" color={'text9'}>
                or <GradientText style={{ marginLeft: 2 }}>Upload</GradientText>
              </TYPE.small>
            </Flex>
          </UploaderCard>
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

interface ChooseFileTypes {
  label?: string | JSX.Element | null
  file: FileWithPath | null
  onDrop: (file: FileWithPath) => void
  error?: any
  handleDeleteClick: () => void
  id?: any
}

export const ChooseFile = ({ label, file, onDrop, error, handleDeleteClick, id }: ChooseFileTypes) => {
  return (
    <Box style={{ maxWidth: 200 }}>
      {label && <Label label={label} />}
      {file ? (
        <FilePreview file={file} index={1} handleDeleteClick={handleDeleteClick} withBackground={false} />
      ) : (
        <Upload file={file} onDrop={onDrop} data-testid={id}>
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
        <Label label={t`Full Name`} />
        <Label label={t`% Shareholding`} />
        <Label label={t`Proof of Address`} />
        <Label label={t`Proof of Identity`} />
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

const StyledUploadLogo = styled(UploadLogo)`
  ${({ theme }) =>
    theme.config.elements?.main &&
    css`
      path {
        stroke: ${theme.config.elements?.main};
        fill: none;
      }
    `}
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
  border: ${({ error, theme }) => error ? 'solid 1px' + theme.error : 'none'};
  background-color: ${({ theme: { bg19 } }) => bg19};
  :focus {
    background-color: ${({ theme: { bg7, config, bg19 } }) => (config.background ? bg19 : bg7)};
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
