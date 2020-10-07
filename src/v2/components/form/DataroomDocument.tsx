import React, { useRef } from 'react'
import { DataroomFile } from 'v2/types/dataroomFile'
import {
  defaultUploadDocumentInfo,
  UploadDocumentInfo,
  useUploadFile
} from 'v2/hooks/useUploadFile'
import { useWatch } from 'react-hook-form'
import { Button } from '@material-ui/core'
import { useDeleteFile } from 'v2/hooks/useDeleteFile'
import { Maybe } from 'v2/types/util'

export interface DataroomDocumentInputProps {
  name: string
  onChange: (document: Maybe<DataroomFile>) => any
  value?: DataroomFile | null
}

export interface DataroomDocumentProps {
  documentInfo?: UploadDocumentInfo
  uploadComponent?: JSX.Element
  deleteComponent?: JSX.Element
  onDelete?: () => any
  canDelete?: boolean
  setValueToNullOnDelete?: boolean
}

export const getDocumentId = (document: any) => {
  if (document === undefined || document === null) {
    return ''
  }

  if (typeof document === 'string') {
    return document
  }

  return (document as DataroomFile)._id
}

export const DataroomDocument: React.FC<
  DataroomDocumentProps & DataroomDocumentInputProps
> = props => {
  const {
    name,
    documentInfo = defaultUploadDocumentInfo,
    uploadComponent,
    deleteComponent,
    onChange,
    onDelete,
    canDelete = true,
    setValueToNullOnDelete = true,
    value: defaultValue
  } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const value = useWatch<DataroomFile>({ name })
  const document = value === undefined ? defaultValue : value
  const [deleteFile] = useDeleteFile(getDocumentId(document))
  const [uploadFile] = useUploadFile({
    onSuccess: response => onChange(response.data[0])
  })
  let buttonElement: JSX.Element
  const handleChange = async () => {
    // eslint-disable-next-line
    if (
      inputRef.current !== null &&
      inputRef.current.files !== null &&
      inputRef.current.files.length > 0
    ) {
      const file = inputRef.current.files[0]
      await uploadFile({
        ...documentInfo,
        documents: file
      })
    }
  }
  const handleDeleteClick = async () => {
    await deleteFile()
    onDelete?.()

    if (setValueToNullOnDelete) {
      onChange(null)
    }
  }

  if (canDelete && document !== undefined && document !== null) {
    buttonElement = (
      <div onClick={handleDeleteClick}>
        {deleteComponent ?? (
          <Button variant='contained' component='span'>
            Delete
          </Button>
        )}
      </div>
    )
  } else {
    buttonElement = (
      <label htmlFor={name}>
        {uploadComponent ?? (
          <Button variant='contained' component='span'>
            Upload
          </Button>
        )}
      </label>
    )
  }

  return (
    <>
      <input
        type='file'
        ref={inputRef}
        id={name}
        multiple={false}
        onChange={handleChange}
        hidden
      />
      {buttonElement}
    </>
  )
}
