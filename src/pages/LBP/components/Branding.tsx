import React, { ChangeEvent, useState } from 'react'
import { useShowError } from 'state/application/hooks'
import { MAX_FILE_UPLOAD_SIZE, MAX_FILE_UPLOAD_SIZE_ERROR } from 'constants/constants'
import { UploaderLBP } from 'pages/KYC/common'
import { FormGrid } from 'pages/KYC/styleds'

interface BrandingProps {
  onChange: (data: any) => void
}

export default function Branding({ onChange }: BrandingProps) {
  const [values, setValues] = useState<any>({
    LBPLogo: null,
    LBPBanner: null,
  })
  const showError = useShowError()

  const handleDropImage = (acceptedFile: any, key: string) => {
    const file = acceptedFile
    if (file?.size > MAX_FILE_UPLOAD_SIZE) {
      showError(MAX_FILE_UPLOAD_SIZE_ERROR)
    } else if (values[key]) {
      showError('You can only upload one image at a time.')
    } else {
      setValues((prevValues: any) => ({ ...prevValues, [key]: file }))
      onChange({ ...values, [key]: file })
    }
  }

  const handleImageDelete = (key: string) => {
    setValues((prevValues: any) => ({ ...prevValues, [key]: null }))
    onChange({ ...values, [key]: null })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    const { value } = e.target
    setValues((prevValues: any) => ({ ...prevValues, [name]: value }))
    onChange({ ...values, [name]: value })
  }

  return (
    <>
      <FormGrid columns={2}>
        <UploaderLBP
          name="logo"
          onChange={(e) => handleInputChange(e, 'LBPLogo')}
          title=""
          files={values.LBPLogo ? [values.LBPLogo] : []}
          onDrop={(file) => {
            handleDropImage(file, 'LBPLogo')
          }}
          handleDeleteClick={() => {
            handleImageDelete('LBPLogo')
          }}
        />
        <UploaderLBP
          name="banner"
          onChange={(e) => handleInputChange(e, 'LBPBanner')}
          title=""
          files={values.LBPBanner ? [values.LBPBanner] : []}
          onDrop={(file) => {
            handleDropImage(file, 'LBPBanner')
          }}
          handleDeleteClick={() => {
            handleImageDelete('LBPBanner')
          }}
        />
      </FormGrid>
    </>
  )
}
