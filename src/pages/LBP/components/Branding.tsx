import React, { ChangeEvent, useState, useEffect } from 'react'
import { useShowError } from 'state/application/hooks'
import { MAX_FILE_UPLOAD_SIZE, MAX_FILE_UPLOAD_SIZE_ERROR } from 'constants/constants'
import { UploaderLBP } from 'pages/KYC/common'
import { FormGrid } from 'pages/KYC/styleds'
import styled from 'styled-components'
import { BrandingProps } from 'components/LBP/types'
import { Loader } from 'components/LaunchpadOffer/util/Loader'

interface BrandingDataProps {
  onChange: (data: any) => void
  brandingData: BrandingProps
  isValidUser: boolean
}

export default function Branding({ onChange, brandingData, isValidUser }: BrandingDataProps) {
  const [values, setValues] = useState<any>({
    LBPLogo: null,
    LBPBanner: null,
  })
  const [loading, setLoading] = useState<boolean>(true)

  const showError = useShowError()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const fetchFileData = async (fileInfo: any, key: string) => {
        try {
          if (fileInfo && fileInfo.public) {
            const response = await fetch(fileInfo.public)
            if (response.ok) {
              const blob = await response.blob()
              setValues((prevValues: any) => ({
                ...prevValues,
                [key]: new File([blob], fileInfo.name || key, { type: fileInfo.mimeType }),
              }))
            } else {
              throw new Error(`Failed to fetch ${key} data`)
            }
          }
        } catch (error) {
          showError(`Error fetching ${key} data`)
          setLoading(false)
        }
      }

      await Promise.all([
        fetchFileData(brandingData.LBPLogo, 'LBPLogo'),
        fetchFileData(brandingData.LBPBanner, 'LBPBanner'),
      ])
      setLoading(false)
    }

    fetchData()
  }, [brandingData, showError])

  const handleDropImage = (acceptedFile: any, key: string) => {
    if (acceptedFile?.size > MAX_FILE_UPLOAD_SIZE) {
      showError(MAX_FILE_UPLOAD_SIZE_ERROR)
    } else if (values[key]) {
      showError('You can only upload one image at a time.')
    } else {
      const updatedValues = { ...values, [key]: acceptedFile }
      setValues(updatedValues)
      onChange(updatedValues)
    }
  }

  const handleImageDelete = (key: string) => {
    const updatedValues = { ...values, [key]: null }
    setValues(updatedValues)
    onChange(updatedValues)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    const { value } = e.target
    const updatedValues = { ...values, [name]: value }
    setValues(updatedValues)
    onChange(updatedValues)
  }

  console.log(isValidUser, 'isValidUser')

  return (
    <>
      <FormGrid columns={2}>
        {!loading ? (
          <div>
            <UploaderLBP
              name="logo"
              onChange={(e) => handleInputChange(e, 'LBPLogo')}
              title="Project Token Logo"
              files={values.LBPLogo ? [values.LBPLogo] : []}
              onDrop={(file) => handleDropImage(file, 'LBPLogo')}
              handleDeleteClick={isValidUser ? () => {} : () => handleImageDelete('LBPLogo')}
            />
            {values.LBPLogo === null && <ErrorText>Please upload a logo</ErrorText>}
          </div>
        ) : (
          <LoadingIndicator>
            <Loader />
          </LoadingIndicator>
        )}
        {!loading ? (
          <div>
            <UploaderLBP
              name="banner"
              onChange={(e) => handleInputChange(e, 'LBPBanner')}
              title="LBP Banner"
              files={values.LBPBanner ? [values.LBPBanner] : []}
              onDrop={(file) => handleDropImage(file, 'LBPBanner')}
              handleDeleteClick={isValidUser ? () => {} : () => handleImageDelete('LBPBanner')}
            />
            {values.LBPBanner === null && <ErrorText>Please upload a banner</ErrorText>}
          </div>
        ) : (
          <LoadingIndicator>
            <Loader />
          </LoadingIndicator>
        )}
      </FormGrid>
    </>
  )
}

const LoadingIndicator = styled.div`
  align-content: center;
  justify-self: center;
`

const ErrorText = styled.span`
  border: none;
  color: red;
  font-size: 12px;
  display: block;
  margin-bottom: 15px;
  margin-top: 10px;
  text-align: center;
`
