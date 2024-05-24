import React, { useState, ChangeEvent, useEffect } from 'react'
import { Box, Flex } from 'rebass'
import { Trans } from '@lingui/macro'
import { Label } from '@rebass/forms'
import _isEmpty from 'lodash/isEmpty'
import { StyledTextarea } from 'components/CollectionForm/styled'
import { Select, TextInput, UploaderDocs } from 'pages/KYC/common'
import { LinkStyledButton, TYPE } from 'theme'
import { RowCenter } from 'components/Row'
import { ExtraInfoCardCountry } from 'pages/KYC/styleds'
import { Plus } from 'react-feather'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import { ReactComponent as TrashIcon } from 'assets/images/newDelete.svg'
import { MAX_FILE_UPLOAD_SIZE } from 'constants/constants'
import { ButtonOutlined, PinnedContentButton } from 'components/Button'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import closeIcon from '../../../../assets/images/newCross.svg'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { socialMediaPlatform } from 'pages/KYC/mock'
import AddSocialLinksModal from './AddSocialLinksModal'
import AdditionalLinksModal from './AdditionalLinksModal'

interface ProjectInfoProps {
  onChange: (data: any) => void
  formData: ProjectInfoData
}

interface LinkData {
  name: string
  url: string
}

interface ProjectInfoData {
  title: string
  description: string
  website: string
  socialLinks: any
  whitepapers: any
  uploadDocs: any
  [key: string]: any
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title should have at least 3 characters')
    .max(20, 'Title should not have more than 20 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(100, 'Description should have at least 100 characters')
    .max(2000, 'Description should not have more than 2000 characters'),
  website: Yup.string().required('Website URL required').url('Enter a valid URL'),
  socialLinks: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Link Name is required'),
        url: Yup.string().required('URL is required'),
      })
    )
    .min(1, 'At least one social link is required'),

  whitepapers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Link Name is required'),
      url: Yup.string().required('URL is required'),
    })
  ),
  uploadDocs: Yup.array().of(Yup.string()).required('Upload Documents are required'),
})

const FormArray = ({ label, items, removeItem, handleChange, openModal }: any) => {
  const handleInternalChange = (value: string, index: number) => {
    handleChange(value, index, label)
  }

  return (
    <>
      <Label htmlFor={label} flexDirection="column" mb={2}>
        <TYPE.subHeader1>
          <Trans>{label}</Trans>
        </TYPE.subHeader1>
      </Label>
      {items?.map((item: any, index: number) => (
        <Flex key={index} mb={2} alignItems="center" justifyContent="space-between">
          <Box width={1}>
            <TYPE.body1 style={{ marginBottom: '5px' }}> {item?.name}</TYPE.body1>

            <TextInput
              placeholder={label}
              value={item?.url}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleInternalChange(e.target.value, index)
              }}
              style={{ width: '100%' }}
            />
          </Box>
          <IconButton onClick={() => removeItem(index)} style={{ padding: '0 1rem' }}>
            <TrashIcon style={{ marginTop: '28px' }} />
          </IconButton>
        </Flex>
      ))}

      <LinkButton type="button" onClick={() => openModal(label)} style={{ width: '100%', textDecoration: 'none' }}>
        <ExtraInfoCardCountry>
          <RowCenter>
            <Plus style={{ width: '20px', marginRight: '5px' }} />
            <Box> Add {label} </Box>
          </RowCenter>
        </ExtraInfoCardCountry>
      </LinkButton>
    </>
  )
}

export default function ProjectInfo({ onChange, formData }: ProjectInfoProps) {
  const [projectInfoData, setProjectInfoData] = useState<ProjectInfoData>({
    title: '',
    description: '',
    website: '',
    socialLinks: [],
    whitepapers: [],
    uploadDocs: [],
  })
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      website: '',
      socialLinks: [],
      whitepapers: [],
      uploadDocs: [],
    },
    validationSchema: validationSchema,
    onSubmit: () => {},
  })

  const [isTouchSocialLinks, setTouchSocialLinks] = useState(false)
  const [isOpenSocialLinkModal, setOpenSocialLinkModal] = useState(false)
  const [isOpenAdditionalLinkModal, setOpenAdditionalLinkModal] = useState(false)
  const [newLinkName, setNewLinkName] = useState('')
  const [newLinkUrl, setNewLinkUrl] = useState('')
  const [linkType, setLinkType] = useState<string>('')
  const [values, setValues] = useState<any>({
    uploadDocs: [],
  })
  const [isErrorUploadDocs, setIsErrorUploadDocs] = useState(false)

  useEffect(() => {
    setProjectInfoData({
      ...formData,
    })
    setValues({ ...values, uploadDocs: formData.uploadDocs })
  }, [formData, formData.uploadDocs])

  const handleAddLink = () => {
    let updatedData: ProjectInfoData | undefined

    const newLink: LinkData = {
      name: newLinkName,
      url: newLinkUrl,
    }

    if (linkType === 'Social Links *') {
      const socialLinks = Array.isArray(projectInfoData.socialLinks) ? projectInfoData.socialLinks : []
      updatedData = {
        ...projectInfoData,
        socialLinks: [...socialLinks, newLink],
      }
    } else if (linkType === 'Additional links') {
      const whitepapers = Array.isArray(projectInfoData.whitepapers) ? projectInfoData.whitepapers : []
      updatedData = {
        ...projectInfoData,
        whitepapers: [...whitepapers, newLink],
      }
    }

    if (updatedData) {
      setProjectInfoData(updatedData)
      setNewLinkName('')
      setNewLinkUrl('')
      onChange(updatedData)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formik.handleChange(event)
    const { name, value } = e.target
    setProjectInfoData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    onChange({ ...projectInfoData, [name]: value })
  }

  const openModalSocialLink = () => {
    setLinkType('Social Links *')
    setOpenSocialLinkModal(true)
    setTouchSocialLinks(true)
  }

  const openModalAdditionalLink = () => {
    setLinkType('Additional links')
    setOpenAdditionalLinkModal(true)
  }

  const handleRemoveItem = (index: number, label: string) => {
    setProjectInfoData((prevData) => {
      const updatedItems = [...prevData[label]]
      updatedItems.splice(index, 1)
      return { ...prevData, [label]: updatedItems }
    })

    onChange({ ...projectInfoData, [label]: projectInfoData[label].filter((_: any, i: number) => i !== index) })
  }

  const handleDropImage = (acceptedFiles: any, key: string) => {
    const files = Array.isArray(acceptedFiles) ? acceptedFiles : [acceptedFiles]

    if (files.some((file: any) => file.size > MAX_FILE_UPLOAD_SIZE)) {
      setIsErrorUploadDocs(true)
      return
    }

    const filteredFiles = files.filter((file: any) => file.size <= MAX_FILE_UPLOAD_SIZE)

    const updatedFiles = values[key] ? [...values[key], ...filteredFiles] : [...filteredFiles]
    setValues({ ...values, [key]: updatedFiles })
    onChange({ ...projectInfoData, [key]: updatedFiles })
  }

  const handleImageDelete = (index: number, key: string) => {
    const updatedFiles = values[key].filter((_: any, i: number) => i !== index)
    setValues({ ...values, [key]: updatedFiles })
    onChange({ ...projectInfoData, [key]: updatedFiles })
  }

  const handleFormArrayChange = (value: string, index: number, label: string) => {
    if (!Array.isArray(projectInfoData[label])) {
      return
    }

    if (value === '' && index > 0) {
      return
    }

    const updatedItems = [...projectInfoData[label]]
    updatedItems[index] = value
    setProjectInfoData((prevData) => ({ ...prevData, [label]: updatedItems }))
    onChange({ ...projectInfoData, [label]: updatedItems })
  }

  const onSelectChange = (field: string, value: any) => {
    setValues({ ...values, [field]: value })
    setNewLinkName(value?.label)
  }

  console.log('formData.socialLinks', formData.socialLinks, _isEmpty(formData.socialLinks))

  return (
    <>
      {isOpenSocialLinkModal ? (
        <AddSocialLinksModal
          isOpen={isOpenSocialLinkModal}
          onClose={() => setOpenSocialLinkModal(false)}
          onSelectChange={onSelectChange}
          setNewLinkUrl={setNewLinkUrl}
          handleAddLink={handleAddLink}
        />
      ) : null}

      {isOpenAdditionalLinkModal ? (
        <AdditionalLinksModal
          isOpen={isOpenAdditionalLinkModal}
          onClose={() => setOpenAdditionalLinkModal(false)}
          setNewLinkName={setNewLinkName}
          setNewLinkUrl={setNewLinkUrl}
          handleAddLink={handleAddLink}
        />
      ) : null}

      <TextInput
        placeholder="Title"
        id="title"
        name="title"
        label="Title *"
        value={formData.title}
        onChange={handleInputChange}
        onBlur={formik.handleBlur}
        // value={formik.values.title}
      />
      {formik.touched.title && formik.errors.title ? <ErrorText>{formik.errors.title}</ErrorText> : null}
      <Box width={1} mb={3}>
        <Label htmlFor="description" flexDirection="column" mb={2}>
          <Box>
            <TYPE.subHeader1>
              <Trans>LBP Description *</Trans>
            </TYPE.subHeader1>
            <TYPE.description3 fontSize={'12px'} color={'#8F8FB2'}>
              <Trans>Provide LBP description. Min 100, Max 2000 characters.</Trans>
            </TYPE.description3>
          </Box>
        </Label>
        <StyledTextarea
          value={formData.description}
          onChange={handleInputChange}
          name="description"
          onBlur={formik.handleBlur}
          style={{ height: '126px' }}
        />
        {formik.touched.description && formik.errors.description ? (
          <ErrorText>{formik.errors.description}</ErrorText>
        ) : null}
      </Box>
      <TextInput
        name="website"
        value={formData.website}
        onChange={handleInputChange}
        placeholder="Official Website"
        id="website"
        label="Official Website *"
        onBlur={formik.handleBlur}
      />
      {formik.touched.website && formik.errors.website ? <ErrorText>{formik.errors.website}</ErrorText> : null}

      <FormArray
        label="Social Links *"
        name="socialLinks"
        id="socialLinks"
        items={projectInfoData?.socialLinks?.map((link: any) => link)}
        removeItem={(index: number) => handleRemoveItem(index, 'socialLinks')}
        handleChange={handleFormArrayChange}
        openModal={openModalSocialLink}
        onBlur={formik.handleBlur}
      />
      {isTouchSocialLinks && _isEmpty(formData.socialLinks) ? (
        <ErrorText>At least one social link is required</ErrorText>
      ) : null}

      <FormArray
        label="Additional links"
        name="whitepapers"
        id="whitepapers"
        items={projectInfoData?.whitepapers?.map((whitepaper: any) => whitepaper)}
        removeItem={(index: number) => handleRemoveItem(index, 'whitepapers')}
        handleChange={handleFormArrayChange}
        openModal={openModalAdditionalLink}
        onBlur={formik.handleBlur}
      />

      <Label htmlFor="description" flexDirection="column" mb={2}>
        <Box>
          {/* <TYPE.subHeader1> */}
          <TYPE.label marginBottom={'6px'} fontSize={'16px'}>
            Upload Documents
          </TYPE.label>
          {/* </TYPE.subHeader1> */}
          <TYPE.description3 color={'#666680'}>
            <Trans>
              All documents should be dated within the last 3 months. Type of document format supported is PDF, JPG, and
              PNG.
            </Trans>
          </TYPE.description3>
        </Box>
      </Label>
      <UploaderDocs
        title=""
        files={values.uploadDocs}
        onDrop={(acceptedFiles: any[]) => {
          handleDropImage(acceptedFiles, 'uploadDocs')
        }}
        handleDeleteClick={(index: number) => {
          setIsErrorUploadDocs(false)
          handleImageDelete(index, 'uploadDocs')
        }}
      />
      {isErrorUploadDocs && <ErrorText>Max size is 5 Mb</ErrorText>}
    </>
  )
}

const LinkButton = styled(LinkStyledButton)`
  color: #6666ff;
`

const ModalContainer = styled.div`
  background: white;
  padding: 35px;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  width: 500px;
  @media (max-width: 768px) {
    width: calc(100% - 24px);
    padding: 20px;
    border-radius: 12px;
    margin: 0 auto;
  }
`

const ErrorText = styled.span`
  border: none;
  color: red;
  font-size: 12px;
  display: block;
  margin-bottom: 15px;
  margin-top: 10px;
`
