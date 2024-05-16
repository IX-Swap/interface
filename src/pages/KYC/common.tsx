import React, { CSSProperties, ChangeEvent, FC, HTMLProps } from 'react'
import { Box, Flex } from 'rebass'
import styled, { css } from 'styled-components'
import { t, Trans } from '@lingui/macro'
import { FileWithPath } from 'react-dropzone'

import { Input, Textarea } from 'components/Input'
import { ButtonGradient, ButtonOutlined, PinnedContentButton } from 'components/Button'
import { TYPE, EllipsisText, MEDIA_WIDTHS, LinkStyledButton } from 'theme'
import { Label } from 'components/Label'
import Upload from 'components/Upload'
import { FilePreview } from 'components/FilePreview'
import { GradientText } from 'pages/CustodianV2/styleds'
import { Select as ReactSelect } from 'components/Select'
import { AcceptFiles } from 'components/Upload/types'

import { ReactComponent as UploadLogo } from 'assets/images/NewDownloads.svg'
import { ReactComponent as UploadLogoLbp } from 'assets/images/Browse.svg'
import { ReactComponent as InfoLogo } from 'assets/images/info-filled.svg'
import { ReactComponent as CrossIcon } from 'assets/images/cross.svg'

import { ReactComponent as OneIcon } from 'assets/images/one.svg'
import { ReactComponent as TwoIcon } from 'assets/images/two.svg'
import { ReactComponent as ThreeIcon } from 'assets/images/three .svg'
import { ReactComponent as InvalidFormInputIcon } from 'assets/svg/invalid-form-input-icon.svg'
import { Text } from 'rebass'

import { UploaderCard, FormGrid, BeneficialOwnersTableContainer, ExtraInfoCardCountry } from './styleds'
import Row, { RowCenter } from 'components/Row'
import SelfieImage from 'assets/images/selfie.svg'
import { alignItems } from 'styled-system'
import { isMobile } from 'react-device-detect'
import { ImagePreview } from 'components/FilePreview/ImagePreview'
import { Plus } from 'react-feather'

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
  name?: string
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
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
  subText?: string
}

type TextInputProps = HTMLProps<HTMLInputElement | HTMLTextAreaElement> & {
  error?: any | JSX.Element
  required?: boolean
  tooltipText?: string | JSX.Element
  isText?: boolean
  subText?: string
}

interface KycInputLabelProps {
  name?: string
  error?: any
  label?: string
  tooltipText?: string | JSX.Element
  style?: string
}

export const KycInputLabel: FC<KycInputLabelProps> = ({ label, error, name, tooltipText }) => {
  if (!label) {
    return null
  }

  return (
    <Row alignItems="center">
      {error && (
        <div>
          <InvalidFormInputIcon style={{ margin: '0 0.5rem' }} />
        </div>
      )}
      <div>
        <Label label={label} htmlFor={name || ''} tooltipText={tooltipText} color={error && '#FF007F'} />
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
          <Trans>{error}</Trans>
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
  subText,
  ...rest
}: SelectProps) => {
  return (
    <Box>
      <KycInputLabel label={label} tooltipText={tooltipText} error={error} />
      {label !== 'Nationality' && (
        <p style={{ color: '#B8B8CC', fontSize: '12px', padding: '0px 80px 0px 0px' }}>{subText}</p>
      )}

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
  onWheel,
  required,
  error = false,
  tooltipText,
  disabled = false,
  isText = false,
}: TextInputProps) => {
  return (
    <Box>
      {label && (
        <Label label={label} htmlFor={name || ''} required={disabled ? false : required} tooltipText={tooltipText} />
      )}

      {isText && value ? (
        <div>{value}</div>
      ) : (
        <StyledInput
          data-testid={id}
          onBlur={onBlur}
          onWheel={onWheel}
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
  subText,
}: TextInputProps) => {
  return (
    <Box>
      <KycInputLabel name={name} label={label} error={error} tooltipText={tooltipText} />
      <p style={{ color: '#B8B8CC', fontSize: '12px', padding: '0px 80px 0px 0px' }}>{subText}</p>
      {disabled && value ? (
        <div>
          {' '}
          <StyledInput style={{ background: '#F7F7FA' }} value={value} />
        </div>
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
              // style={{ marginRight: index !== files.length - 1 ? 0 : 0 }}
            />
          ))}
        </Flex>
      )}
      {!isDisabled && (
        <Upload
          isDisabled={isDisabled}
          accept={`${AcceptFiles.PDF},image/jpeg,image/png` as AcceptFiles}
          data-testid={id}
          file={null}
          onDrop={onDrop}
        >
          <UploaderCard>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ maxWidth: 100 }}>
              <StyledUploadLogo />
              <TYPE.small textAlign="center" marginTop="8px" color={'#666680'}>
                Drag and Drop
              </TYPE.small>
              <TYPE.small display="flex" textAlign="center" color={'#666680'}>
                or <Text style={{ marginLeft: 2, color: '#6666FF' }}>Upload</Text>
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

export const SelfieUploader: FC<UploaderProps> = ({
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
          accept={`${AcceptFiles.PDF},image/jpeg,image/png` as AcceptFiles}
          data-testid={id}
          file={null}
          onDrop={onDrop}
        >
          {!files?.length ? (
            <SelfieUploaderCard>
              <Column style={{ alignItems: 'center', padding: '0px', margin: isMobile ? '20px 0px' : '0px' }}>
                <Image src={SelfieImage} alt="Uploader" />
              </Column>
              <Column
                style={{
                  padding: isMobile ? '0px' : '0px 78px 16px 0px',
                  margin: isMobile ? '0px 0px 0px 16px' : '0px',
                }}
              >
                <Heading>How to Take Your Selfie</Heading>
                <SubHeading>
                  <OneIcon style={{ marginRight: '10px' }} /> Good lighting
                </SubHeading>
                <Paragraph>Make sure you are in a well-lit environment.</Paragraph>
                <SubHeading>
                  <TwoIcon style={{ marginRight: '10px' }} /> Look straight
                </SubHeading>
                <Paragraph>
                  Make sure your face is angled such that your <br /> features are clearly visible.
                </Paragraph>
                <SubHeading>
                  <ThreeIcon style={{ marginRight: '10px' }} /> Hold up handwritten verification text and ID
                </SubHeading>
                <Paragraph>
                  Write down “For IXS Verification” and the current <br /> date on a piece of paper and hold it up
                  together with <br /> your valid ID.
                </Paragraph>
                <PinnedContentButton
                  style={{
                    marginTop: '5px',
                    width: isMobile ? '50%' : '340px',
                    alignSelf: isMobile ? 'center' : 'normal',
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  Upload
                </PinnedContentButton>
              </Column>
            </SelfieUploaderCard>
          ) : (
            <></>
          )}
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
  title?: string
}

export const UploaderLBP: FC<UploaderProps> = ({
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
  name,
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
      {files && files.length > 0 ? (
        <Flex flexWrap="wrap">
          {files.map((file: any, index) => (
            <ImagePreview
              key={`file-${index}-${file.name}`}
              file={file?.asset ? file.asset : file}
              handleDeleteClick={() => {
                handleDeleteClick(index)
              }}
              isDisabled={isDisabled}
              style={{ marginRight: index !== files.length - 1 ? 0 : 0 }}
              index={0}
            />
          ))}
        </Flex>
      ) : (
        <Upload
          isDisabled={isDisabled}
          accept={`${AcceptFiles.PDF},image/jpeg,image/png` as AcceptFiles}
          data-testid={id}
          file={null}
          onDrop={onDrop}
        >
          <UploaderCard style={{ height: '350px' }}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ maxWidth: 100 }}>
              <StyledUploadLogoLbp />
              <TYPE.subHeader1 style={{inlineSize: 'max-content'}} lineHeight={'20px'} textAlign="center" color={'#555566'}>
                {title}
              </TYPE.subHeader1>
              <TYPE.title10 width={'max-content'} textAlign="center" color={'#8F8FB2'}>
                PNG, JPG, and SVG files only.
              </TYPE.title10>
              <TYPE.small display="flex" textAlign="center" color={'#666680'}>
                <Text style={{ marginLeft: 2, color: '#6666FF' }}>Browse</Text>
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

export const UploaderDocs: FC<UploaderProps> = ({
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
              // style={{ marginRight: index !== files.length - 1 ? 0 : 0 }}
            />
          ))}
        </Flex>
      )}
      {!isDisabled && (
        <Upload
          isDisabled={isDisabled}
          accept={`${AcceptFiles.PDF},image/jpeg,image/png` as AcceptFiles}
          data-testid={id}
          file={null}
          onDrop={onDrop}
        >
          <LinkButton type="button" style={{ marginTop: '5px', width: '100%', textDecoration: 'none' }}>
            <ExtraInfoCardCountry>
              <RowCenter>
                <Plus style={{ width: '20px', marginRight: '5px' }} />
                <Box> Add Documents </Box>
              </RowCenter>
            </ExtraInfoCardCountry>
          </LinkButton>
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

export const ChooseFile = ({ label, file, onDrop, error, handleDeleteClick, id }: ChooseFileTypes) => {
  return (
    <Box style={{ maxWidth: '100%' }}>
      {label && <Label label={label} />}
      {file ? (
        <FilePreview file={file} index={1} handleDeleteClick={handleDeleteClick} withBackground={false} />
      ) : (
        // <Upload file={file} onDrop={onDrop} data-testid={id}>
        //   <ButtonOutlined type="button" style={{ height: 52, padding: '7px 16px' }}>
        //     <EllipsisText>{(file as any)?.name || <Trans>Choose File</Trans>}</EllipsisText>
        //   </ButtonOutlined>
        // </Upload>

        <Upload
          accept={`${AcceptFiles.PDF},image/jpeg,image/png` as AcceptFiles}
          data-testid={id}
          file={null}
          onDrop={onDrop}
        >
          <UploaderCard>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ maxWidth: 100 }}>
              <StyledUploadLogo />
              <TYPE.small textAlign="center" marginTop="8px" color={'#666680'}>
                Drag and Drop
              </TYPE.small>
              <TYPE.small display="flex" textAlign="center" color={'#666680'}>
                or <Text style={{ marginLeft: 2, color: '#6666FF' }}>Upload</Text>
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

interface BeneficialOwnersTableTypes {
  data: Array<{
    fullName: string
    nationality: string
    address: string
    shareholding: string
    proofOfIdentity: FileWithPath | null
  }>
}

export const BeneficialOwnersTable = ({}: BeneficialOwnersTableTypes) => {
  return (
    <BeneficialOwnersTableContainer>
      <FormGrid columns={6}>
        <Label label={`Full Name`} />
        <Label label={`Nationality`} />
        <Label label={`Address`} />
        <Label label={`% Beneficial Ownership`} />
        <Label label={`Proof of Identity`} />
        <Label label={``} />
      </FormGrid>
    </BeneficialOwnersTableContainer>
  )
}

interface CorporateMembersTableTypes {
  data: Array<{
    fullName: string
    nationality: string
    designation: string
    proofOfIdentity: FileWithPath | null
  }>
}

export const CorporateMembersTable = ({}: CorporateMembersTableTypes) => {
  return (
    <BeneficialOwnersTableContainer>
      <FormGrid columns={6}>
        <Label label={t`Full Name`} />
        <Label label={t`Nationality`} />
        <Label label={t`Designation`} />
        <Label label={t`Proof of Identity`} />
        <Label label={t``} />
      </FormGrid>
    </BeneficialOwnersTableContainer>
  )
}

interface DeleteRowTypes {
  children?: JSX.Element
  onClick?: () => void
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
  border-radius: 8px;
  font-weight: normal;
  font-size: 16px;
  border: ${({ error, theme }) => (error ? 'solid 1px' + theme.error : 'solid 1px #E6E6FF')};
  background-color: ${({ disabled, theme: { bg0, bg23 } }) => {
    return disabled ? bg23 : bg0
  }};
  :focus {
    // background-color: ${({ theme: { bg7, config, bg19 } }) => (config.background ? bg19 : bg7)};
    background-color: ${({ theme: { bg0 } }) => bg0};
  }
  :disabled {
    color: #b8b8cc;
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

// const UploaderCard = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   max-width: 100px;
// `

const Column = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align content to the start */
`

const Image = styled.img`
  max-width: 100%;
  height: auto;
`

const Icon = styled.span`
  margin-right: 8px;
`

const Heading = styled.h2`
  font-size: 18px;
  margin: 0px 0px 20px 0px;
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #292933;
`

const SubHeading = styled.h3`
  font-size: 13px;
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: 500;
`

const Paragraph = styled.p`
  font-size: 13px;
  color: #b8b8cc;
  margin-top: 4px;
  font-size: 13px;
  font-weight 500;
  margin-bottom: 18px;
`

// const Button = styled.button`
//   background-color: #6666ff;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-size: 16px;
//   border-radius: 4px;
//   margin-top: 16px;
//   cursor: pointer;
// `

export const SelfieUploaderCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 100%;
  background: ${({ theme }) => theme.bg0};
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  cursor: pointer;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
    height: 720px;
  }
`
const LinkButton = styled(LinkStyledButton)`
  color: #6666ff;
`
