import { Grid, Typography, Box } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { DataroomFileType } from 'config/dataroom'
import { Tooltip } from 'app/pages/identity/components/UploadDocumentsForm/Tooltip/Tooltip'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { FieldsArray } from 'components/form/FieldsArray'
import { plainValueExtractor } from 'helpers/forms'
import { Icon } from 'ui/Icons/Icon'
import { AddDocumentButton } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/AddDocumentButton'
import { DataroomFile } from 'types/dataroomFile'

export interface UploadDocumentFieldProps {
  name: any
  label: string
  helperElement?: React.ReactNode
  tooltipContent?: any
  fieldId?: any
  defaultValue?: any
}

export const UploadDocumentField = ({
  name,
  label,
  helperElement,
  tooltipContent
}: UploadDocumentFieldProps) => {
  const { control, watch, formState } = useFormContext()

  const defaultUploadedFiles =
    watch(name) !== undefined && Array.isArray(watch(name))
      ? watch(name).map((file: { value: DataroomFile }) => file.value)
      : []
  const filteredDefaultUploadedFiles = defaultUploadedFiles.filter(
    (file: DataroomFile) => Object.keys(file).length > 0
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
      {label !== '' && (
        <Grid item xs={12}>
          <Box>
            <Grid item container alignItems='center'>
              <Typography variant='h5'>{label}</Typography>
              <Box pr={1}></Box>
              {tooltipContent !== undefined ? (
                <Tooltip
                  data-testid='upload-document-field-tooltip'
                  title={tooltipContent}
                />
              ) : null}
            </Grid>
          </Box>
          {helperElement !== undefined ? <Box>{helperElement}</Box> : null}
        </Grid>
      )}
      <Grid item xs={12}>
        <FieldsArray name={name} control={control}>
          {({ fields, append, remove }) => (
            <Grid container spacing={2}>
              {fields.map((field, index) => {
                return (
                  <Grid item xs={12} key={field.id}>
                    <TypedField
                      customRenderer
                      name={[name, index, 'value']}
                      control={control}
                      component={FileUpload}
                      isValid={
                        formState.isValid ? true : uploadedFiles.length > 0
                      }
                      label='Upload File'
                      valueExtractor={plainValueExtractor}
                      accept={DataroomFileType.document}
                      fullWidth
                      maxSize={10}
                      documentInfo={{
                        type: label,
                        title: label
                      }}
                      remove={() => {
                        remove(index)
                      }}
                      onSuccessUploadCallback={handleSuccessFileUpload}
                      onRemoveCallback={handleRemoveFile}
                      defaultValue={field.value}
                    />
                  </Grid>
                )
              })}

              <AddDocumentButton
                name={name}
                isVisible={
                  fields.length === uploadedFiles.length || fields.length === 0
                }
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
