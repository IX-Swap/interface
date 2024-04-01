import React, { useState, ChangeEvent } from 'react'
import { Box, Flex } from 'rebass'
import { Trans } from '@lingui/macro'
import { Label } from '@rebass/forms'
import { StyledTextarea } from 'components/CollectionForm/styled'
import { TextInput, Uploader, UploaderDocs } from 'pages/KYC/common'
import { LinkStyledButton, TYPE } from 'theme'
import { RowCenter } from 'components/Row'
import { ExtraInfoCardCountry } from 'pages/KYC/styleds'
import { Plus } from 'react-feather'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import { ReactComponent as TrashIcon } from 'assets/images/newDelete.svg'
import { useShowError } from 'state/application/hooks'
import { MAX_FILE_UPLOAD_SIZE } from 'constants/constants'

// Reusable form array component
const FormArray = ({ label, items, addItem, removeItem, handleChange }: any) => {
  return (
    <>
      <Label htmlFor={label} flexDirection="column" mb={2}>
        <TYPE.subHeader1>
          <Trans>{label}</Trans>
        </TYPE.subHeader1>
      </Label>
      {items.map((item: string, index: number) => (
        <Flex key={index} mb={2} alignItems="center" justifyContent="space-between">
          <Box width={1}>
            <TextInput
              placeholder={label}
              value={item}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index)}
              style={{ width: '100%' }}
            />
          </Box>
          <IconButton onClick={() => removeItem(index)} style={{ padding: '0 1rem' }}>
            <TrashIcon />
          </IconButton>
        </Flex>
      ))}
      <LinkButton type="button" onClick={addItem} style={{ marginTop: '32px', width: '100%', textDecoration: 'none' }}>
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

export default function ProjectInfo() {
  const [socialLinks, setSocialLinks] = useState<string[]>([''])
  const [whitepapers, setWhitepapers] = useState<string[]>([''])
  const [values, setValues] = useState<any>({
    uploadDocs: [],
  })

  const handleDropImage = (acceptedFiles: any, key: string) => {
    const files = Array.isArray(acceptedFiles) ? acceptedFiles : [acceptedFiles]

    const filteredFiles = files.filter((file: any) => file.size <= MAX_FILE_UPLOAD_SIZE)

    setValues({ ...values, [key]: [...values[key], ...filteredFiles] })
  }

  const handleImageDelete = (index: number, key: string) => {
    const updatedFiles = values[key].filter((_: any, i: number) => i !== index)
    setValues({ ...values, [key]: updatedFiles })
  }

  const handleAddItem = (setter: Function) => {
    setter((prevItems: string[]) => [...prevItems, ''])
  }

  const handleRemoveItem = (index: number, setter: Function) => {
    setter((prevItems: string[]) => prevItems.filter((_, i: number) => i !== index))
  }

  const handleChangeItem = (value: string, index: number, setter: Function) => {
    setter((prevItems: string[]) => {
      const updatedItems = [...prevItems]
      updatedItems[index] = value
      return updatedItems
    })
  }

  return (
    <>
      <TextInput placeholder="Title" id="title" label="Title" />
      <Box width={1} mb={3}>
        <Label htmlFor="description" flexDirection="column" mb={2}>
          <Box>
            <TYPE.subHeader1>
              <Trans>LBP Description</Trans>
            </TYPE.subHeader1>
            <TYPE.description3>
              <Trans>Provide LBP description. Min 100, Max 2000 characters.</Trans>
            </TYPE.description3>
          </Box>
        </Label>
        <StyledTextarea name="LBP Description" style={{ height: '126px' }} />
      </Box>
      <TextInput placeholder="Official Website" id="website" label="Official Website" />

      {/* Social Links */}
      <FormArray
        label="Social Links"
        items={socialLinks}
        addItem={() => handleAddItem(setSocialLinks)}
        removeItem={(index: number) => handleRemoveItem(index, setSocialLinks)}
        handleChange={(value: string, index: number) => handleChangeItem(value, index, setSocialLinks)}
      />

      {/* Whitepapers */}
      <FormArray
        label="Whitepaper"
        items={whitepapers}
        addItem={() => handleAddItem(setWhitepapers)}
        removeItem={(index: number) => handleRemoveItem(index, setWhitepapers)}
        handleChange={(value: string, index: number) => handleChangeItem(value, index, setWhitepapers)}
      />

      <Label htmlFor="description" flexDirection="column" mb={2}>
        <Box>
          <TYPE.subHeader1>
            <Trans>Upload Documents</Trans>
          </TYPE.subHeader1>
          <TYPE.description3>
            <Trans>All documents should be dated within the last 3 months. Type of document format supported is PDF, JPG, and PNG.</Trans>
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
          handleImageDelete(index, 'uploadDocs')
        }}
      />
    </>
  )
}

const LinkButton = styled(LinkStyledButton)`
  color: #6666ff;
`
