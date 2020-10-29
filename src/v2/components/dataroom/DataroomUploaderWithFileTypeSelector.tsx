import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import { DataroomFileTypeSelect } from 'v2/components/dataroom/DataroomFileTypeSelect'
import { DataroomFile } from 'v2/types/dataroomFile'
import { UploadDocumentInfo } from 'v2/hooks/useUploadFile'
import { DataroomDocumentType } from 'v2/config/dataroom'
import { DataroomUploadAndAppend } from 'v2/components/dataroom/DataroomUploadAndAppend'
import { UploadButton } from 'v2/components/dataroom/UploadButton'

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
    <Box display='flex'>
      <DataroomFileTypeSelect
        variant='outlined'
        value={fileType}
        onChange={event =>
          setFileType(event.target.value as DataroomDocumentType)
        }
      />
      <Box mx={0.5} />
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
