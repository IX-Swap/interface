import { Grid, Typography, Box } from '@mui/material'
import { Dropzone } from 'components/dataroom/Dropzone'
import { TypedField } from 'components/form/TypedField'
import { documentValueExtractor } from 'app/components/DSO/utils'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DataroomFileType } from 'config/dataroom'
import { DocumentList } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/DocumentList'
import { Tooltip } from 'app/pages/identity/components/UploadDocumentsForm/Tooltip/Tooltip'

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
  tooltipContent,
  fieldId,
  defaultValue
}: UploadDocumentFieldProps) => {
  const { control } = useFormContext()

  return (
    <Grid container spacing={3} direction='column'>
      <Grid item>
        <Box>
          <Grid item container alignItems='center'>
            <Typography variant='subtitle1'>{label}</Typography>
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
      <Grid item>
        <TypedField
          key={fieldId}
          control={control}
          customRenderer
          component={Dropzone}
          name={name}
          label=''
          valueExtractor={documentValueExtractor}
          multiple
          fullWidth
          accept={DataroomFileType.report}
          documentInfo={{
            title: label,
            type: label
          }}
          showAcceptable
          defaultValue={defaultValue}
        />
      </Grid>
      <DocumentList name={name} />
    </Grid>
  )
}
