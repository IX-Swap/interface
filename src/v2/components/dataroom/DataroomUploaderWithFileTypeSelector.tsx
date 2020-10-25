import React, { useState } from 'react'
import { Button, Grid, GridProps } from '@material-ui/core'
import { DataroomFileTypeSelect } from 'v2/components/dataroom/DataroomFileTypeSelect'
import { DataroomUploader } from 'v2/components/dataroom/DataroomUploader'
import { DataroomFile } from 'v2/types/dataroomFile'
import { UploadDocumentInfo } from 'v2/hooks/useUploadFile'
import { DataroomDocumentType } from 'v2/config/dataroom'

export interface DataroomUploaderWithFileTypeSelectorProps {
  append: (value: { document: DataroomFile }) => any
  documentInfo?: UploadDocumentInfo
}

export const DataroomUploaderWithFileTypeSelector = (
  props: DataroomUploaderWithFileTypeSelectorProps & GridProps
) => {
  const { append, documentInfo = {}, ...gridProps } = props
  const [fileType, setFileType] = useState<DataroomDocumentType>(
    DataroomDocumentType.Other
  )
  const handleChange = (event: any) => setFileType(event.target.value)

  return (
    <Grid container spacing={1} justify='flex-end' {...gridProps}>
      <Grid item>
        <DataroomFileTypeSelect
          value={fileType}
          onChange={handleChange}
          variant='outlined'
        />
      </Grid>
      <Grid item>
        <DataroomUploader
          name=''
          label=''
          value={{} as any}
          documentInfo={{ type: fileType, title: fileType, ...documentInfo }}
          onChange={file => append({ document: file })}
          render={({ handleUpload }) => (
            <Button
              size='large'
              variant='contained'
              color='primary'
              onClick={handleUpload}
            >
              Upload
            </Button>
          )}
        />
      </Grid>
    </Grid>
  )
}
