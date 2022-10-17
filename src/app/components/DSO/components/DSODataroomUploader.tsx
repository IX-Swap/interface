import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { DataroomFileTypeSelect } from 'components/dataroom/DataroomFileTypeSelect'
import { DataroomFile } from 'types/dataroomFile'
import { UploadDocumentInfo } from 'hooks/useUploadFile'
import { DataroomDocumentType } from 'config/dataroom'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { Icon } from 'ui/Icons/Icon'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { VSpacer } from 'components/VSpacer'

export interface DSODataroomUploaderProps {
  fields: any[]
  append: (value: { value: DataroomFile }) => any
  remove?: (index: number) => any
  documentInfo?: UploadDocumentInfo
  control?: any
}

export const DSODataroomUploader = (props: DSODataroomUploaderProps) => {
  const { append, fields, documentInfo = {}, control } = props
  const [fileType, setFileType] = useState<DataroomDocumentType>(
    DataroomDocumentType.Other
  )
  const files = [...fields, {}]
  return (
    <Grid container direction={'column'} spacing={5}>
      <Grid item>
        <DataroomFileTypeSelect
          variant='outlined'
          value={fileType}
          onChange={event =>
            setFileType(event.target.value as DataroomDocumentType)
          }
        />
      </Grid>

      <Grid item container direction={'column'} spacing={2}>
        {files.map((item, i) => (
          <>
            <TypedField
              customRenderer
              control={control}
              component={FileUpload}
              fullWidth
              label={
                <Box display={'flex'} alignItems={'center'}>
                  <Icon name={'file'} />
                  <Box ml={2}>Upload file</Box>
                </Box>
              }
              name={`dataroom_${i}`}
              valueExtractor={plainValueExtractor}
              documentInfo={{
                type: fileType,
                title: fileType,
                ...documentInfo
              }}
              onSuccessUploadCallback={(file: any) => {
                append({ value: file })
              }}
              onRemoveCallback={() => {
                control.setValue(`dataroom_${i}`, undefined)
              }}
            />
            <VSpacer size='small' />
          </>
        ))}
      </Grid>
    </Grid>
  )
}
