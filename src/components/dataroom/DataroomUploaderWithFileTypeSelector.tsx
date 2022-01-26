import React, { useState } from 'react'
import { Box } from '@mui/material'
import { DataroomFileTypeSelect } from 'components/dataroom/DataroomFileTypeSelect'
import { DataroomFile } from 'types/dataroomFile'
import { UploadDocumentInfo } from 'hooks/useUploadFile'
import { DataroomDocumentType } from 'config/dataroom'
import { DataroomUploadAndAppend } from 'components/dataroom/DataroomUploadAndAppend'
import { UploadButton } from 'components/dataroom/UploadButton'

export interface DataroomUploaderWithFileTypeSelectorProps {
  append: (value: { value: DataroomFile }) => any
  documentInfo?: UploadDocumentInfo
}

export const DataroomUploaderWithFileTypeSelector = (
  props: DataroomUploaderWithFileTypeSelectorProps
) => {
  const { append, documentInfo = {} } = props
  const [fileType, setFileType] = useState<DataroomDocumentType>(
    DataroomDocumentType.Other
  )

  return (
    <Box display='flex' justifyContent='space-between'>
      <DataroomFileTypeSelect
        variant='outlined'
        value={fileType}
        onChange={event =>
          setFileType(event.target.value as DataroomDocumentType)
        }
      />
      <Box mx={1} />
      <DataroomUploadAndAppend
        multiple
        label='Uploader'
        append={file => append({ value: file })}
        documentInfo={{ type: fileType, title: fileType, ...documentInfo }}
        render={UploadButton}
      />
    </Box>
  )
}
