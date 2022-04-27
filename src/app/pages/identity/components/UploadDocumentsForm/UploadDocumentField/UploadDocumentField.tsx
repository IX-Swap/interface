import { Grid, Typography, Box, Button } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DataroomFileType } from 'config/dataroom'
import { Tooltip } from 'app/pages/identity/components/UploadDocumentsForm/Tooltip/Tooltip'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { FieldsArray } from 'components/form/FieldsArray'
import { plainValueExtractor } from 'helpers/forms'
import { Icon } from 'ui/Icons/Icon'

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
  const { control } = useFormContext()

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
            <Grid container spacing={1}>
              {fields.map((field, index) => {
                return (
                  <Grid item xs={12} key={field.id}>
                    <TypedField
                      customRenderer
                      name={[name, index, 'value']}
                      control={control}
                      component={FileUpload}
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
                      defaultValue={field.value}
                    />
                  </Grid>
                )
              })}
              <Grid item xs={12}>
                <Button
                  onClick={() => {
                    append({ value: {} })
                  }}
                  variant='outlined'
                  startIcon={<Icon name='plus' />}
                  sx={{ width: '100%' }}
                >
                  Add More
                </Button>
              </Grid>
            </Grid>
          )}
        </FieldsArray>
      </Grid>
    </Grid>
  )
}
