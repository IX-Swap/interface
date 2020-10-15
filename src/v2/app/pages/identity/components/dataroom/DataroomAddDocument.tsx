import React from 'react'
import { DataroomFileWithGuide, DataroomFile } from 'v2/types/dataroomFile'
import { Button } from '@material-ui/core'
import { DataroomUploader } from 'v2/components/form/DataroomUploader'
import {
  defaultUploadDocumentInfo,
  UploadDocumentInfo
} from 'v2/hooks/useUploadFile'

export interface DataroomAddDocumentInfoProps {
  documentInfo?: UploadDocumentInfo
}

export interface DataroomAddDocumentBaseProps {
  append: (document: DataroomFileWithGuide) => void
}

export interface DataroomAddDocumentProps
  extends DataroomAddDocumentInfoProps,
    DataroomAddDocumentBaseProps {
  button?: JSX.Element
}

export const DataroomAddDocument: React.FC<
  DataroomAddDocumentProps & DataroomAddDocumentInfoProps
> = props => {
  const { button, documentInfo = defaultUploadDocumentInfo, append } = props
  const handleChange = (documents: DataroomFile[]) => {
    documents.forEach(document =>
      append({
        title: document.title,
        label: document.originalFileName,
        type: document.type,
        document
      })
    )
  }
  const defaultButton = (
    <Button variant='contained' color='primary' component='span' size='large'>
      Upload
    </Button>
  )

  return (
    <DataroomUploader
      documentInfo={documentInfo}
      onChange={handleChange}
      buttonComponent={button === undefined ? defaultButton : button}
    />
  )
}
