import { Grid, Typography, Box } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { DataroomFileType } from 'config/dataroom'
import { Tooltip } from 'ui/Tooltip/Tooltip'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { FieldsArray } from 'components/form/FieldsArray'
import { plainValueExtractor } from 'helpers/forms'
import { Icon } from 'ui/Icons/Icon'
import { AddDocumentButton } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/AddDocumentButton'
import { DataroomFile } from 'types/dataroomFile'
import { UploadDocumentInfo } from 'hooks/useUploadFile'
import { isEmpty } from 'lodash'

export interface SelfieFieldProps {
  name: any
  label?: string
  helperElement?: React.ReactNode
  tooltipContent?: any
  fieldId?: any
  defaultValue?: any
  isDefaultEmpty?: boolean
  hideLabel?: boolean
}

export const SelfieField = ({
  name,
  label,
  helperElement,
  tooltipContent,
  isDefaultEmpty = false,
  hideLabel = false
}: SelfieFieldProps) => {
  const { control, watch, formState } = useFormContext()

  const defaultUploadedFiles =
    watch(name) !== undefined && Array.isArray(watch(name))
      ? watch(name).map((file: { value: DataroomFile }) => file.value)
      : []
  const filteredDefaultUploadedFiles = defaultUploadedFiles.filter(
    (file: DataroomFile) =>
      typeof file !== 'undefined' && Object.keys(file).length > 0
  )
  const [uploadedFiles, setUploadedFiles] = useState<DataroomFile[]>(
    filteredDefaultUploadedFiles
  )

  const handleSuccessFileUpload = (value: DataroomFile) => {
    setUploadedFiles([...uploadedFiles, value])
  }
  const handleRemoveFile = (value: DataroomFile) => {
    const filteredValue = uploadedFiles.filter((it: DataroomFile) => {
      return it._id !== value._id
    })

    setUploadedFiles(filteredValue)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box>
          <Grid item container alignItems='center'>
            {!hideLabel && (
              <Typography variant='subtitle1' color={'otpInput.color'}>
                {label}
              </Typography>
            )}

            <Box pr={1}></Box>
            {tooltipContent !== undefined ? (
              <Tooltip
                data-testid='upload-document-field-tooltip'
                title={tooltipContent}
              />
            ) : null}
          </Grid>
        </Box>
        {helperElement !== undefined ? <Box mt={1}>{helperElement}</Box> : null}
      </Grid>

      <Grid item xs={12}>
        <FieldsArray name={name} control={control}>
          {({ fields, append, remove }) => (
            <Grid container spacing={2}>
              {fields.map((field, index) => {
                const documentInfo: UploadDocumentInfo = {
                  type: label,
                  title: 'Selfie'
                }

                return (
                  <Grid item xs={12} key={field.id}>
                    <Grid item xs={12} mt={-1}>
                      <TypedField
                        customRenderer
                        name={[name, index, 'value']}
                        control={control}
                        component={FileUpload}
                        isValid={
                          formState.isValid ? true : uploadedFiles.length > 0
                        }
                        label='Upload Selfie'
                        placeHolder='Upload Selfie'
                        valueExtractor={plainValueExtractor}
                        accept={DataroomFileType.document}
                        maxSize={10}
                        documentInfo={documentInfo}
                        remove={() => {
                          remove(index)
                        }}
                        isSelfie
                        onSuccessUploadCallback={handleSuccessFileUpload}
                        onRemoveCallback={handleRemoveFile}
                        defaultValue={
                          !isEmpty(field.value) ? field.value : undefined
                        }
                      />
                    </Grid>
                  </Grid>
                )
              })}

              <AddDocumentButton
                addEmptyValue={!isDefaultEmpty}
                name={name}
                // isVisible={
                //   fields.length === uploadedFiles.length || fields.length === 0
                // }
                isVisible={false}
                onClick={() => {
                  append({ value: {} })
                }}
                variant='outlined'
                startIcon={<Icon name='plus' />}
                sx={{ width: '100%' }}
              />
            </Grid>
          )}
        </FieldsArray>
      </Grid>
    </Grid>
  )
}
