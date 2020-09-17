import React, { useRef } from 'react'
import { Document } from 'v2/types/document'
import { useUploadFile } from 'v2/hooks/useUploadFile'
import { useWatch } from 'react-hook-form'
import { Button } from '@material-ui/core'
import { useDeleteFile } from 'v2/hooks/useDeleteFile'
import { Maybe } from 'v2/types/util'

export interface DocumentUploaderInputProps {
  name: string
  onChange: (document: Maybe<Document>) => any
}

export interface DocumentUploaderProps {
  title: string
  uploadComponent?: JSX.Element
  deleteComponent?: JSX.Element
}

export const DocumentUploader: React.FC<
  DocumentUploaderProps & DocumentUploaderInputProps
> = props => {
  const { name, title, uploadComponent, deleteComponent, onChange } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const document = useWatch<Document>({ name })
  const [uploadFile] = useUploadFile(d => onChange(d[0])) // TODO: refactor to callback free implementation
  const [deleteFile] = useDeleteFile(document?._id ?? '')
  let buttonElement: JSX.Element
  const handleChange = async () => {
    // eslint-disable-next-line
    if (inputRef.current !== null && inputRef.current.files !== null) {
      const file = inputRef.current.files[0]
      await uploadFile({ type: file.type, title, file })
    }
  }
  const handleDeleteClick = async () => {
    await deleteFile()
    onChange(null)
  }

  if (document !== undefined && document !== null) {
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
