import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { DataroomFileTypeSelect } from 'components/dataroom/DataroomFileTypeSelect'
import { DataroomFile } from 'types/dataroomFile'
import { UploadDocumentInfo } from 'hooks/useUploadFile'
import { DataroomDocumentType } from 'config/dataroom'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { Icon } from 'ui/Icons/Icon'

export interface DSODataroomUploaderProps {
  fields: any[]
  append: (value: { value: DataroomFile }) => any
  remove: (index: number) => any
  documentInfo?: UploadDocumentInfo
}

export const DSODataroomUploader = (props: DSODataroomUploaderProps) => {
  const { append, fields, remove, documentInfo = {} } = props
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

      {files.map((item, i) => (
        <Grid item>
          <FileUpload
            key={item.id ?? i}
            value={fields[i]?.value ?? {}}
            fullWidth
            label={
              <Box display={'flex'} alignItems={'center'}>
                <Icon name={'file'} />
                <Box ml={2}>Upload file</Box>
              </Box>
            }
            name={'file'}
            documentInfo={{ type: fileType, title: fileType, ...documentInfo }}
            onSuccessUploadCallback={file => append({ value: file })}
            onRemoveCallback={() => {
              remove(i)
            }}
          />
        </Grid>
      ))}
    </Grid>
  )
}
