import React, { useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import {
  DataroomFileType,
  DataroomFileTypeSelect
} from 'v2/components/form/DataroomFileTypeSelect'
import { NewDataroomUploader } from 'v2/components/form/NewDataroomUploader'
import { DataroomFile } from 'v2/types/dataroomFile'

export interface DataroomUploaderWithFileTypeSelectorProps {
  append: (value: { document: DataroomFile }) => any
}

export const DataroomUploaderWithFileTypeSelector = (
  props: DataroomUploaderWithFileTypeSelectorProps
) => {
  const { append } = props
  const [fileType, setFileType] = useState<DataroomFileType>(
    DataroomFileType.Other
  )
  const handleChange = (event: any) => setFileType(event.target.value)

  return (
    <Grid container spacing={1} justify='flex-end'>
      <Grid item>
        <DataroomFileTypeSelect
          value={fileType}
          onChange={handleChange}
          variant='outlined'
        />
      </Grid>
      <Grid item>
        <NewDataroomUploader
          name=''
          label=''
          value={{} as any}
          documentInfo={{ type: fileType }}
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
