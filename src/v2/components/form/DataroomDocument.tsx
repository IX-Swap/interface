import React, { cloneElement, useRef } from 'react'
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

export const getDocumentId = (doc: any) => {
  if (doc === undefined || doc === null) {
    return ''
  }

  if (typeof doc === 'string') {
    return doc
  }

  if (Array.isArray(doc)) {
    return doc[0]._id
  }

  if ('document' in doc) {
    return doc.document?._id ?? ''
  }

  return doc._id
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
    if (
      // eslint-disable-next-line
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
        {deleteComponent !== undefined ? (
          cloneElement(deleteComponent, { name })
        ) : (
          <Button variant='contained' component='span'>
            Delete
          </Button>
        )}
      </div>
    )
  } else {
    buttonElement = (
      <label htmlFor={name}>
        {uploadComponent !== undefined ? (
          cloneElement(uploadComponent, { name })
        ) : (
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
