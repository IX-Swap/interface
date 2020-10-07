import React, { useRef } from 'react'
import { DataroomFile } from '../../types/dataroomFile'
import { UploadDocumentInfo, useUploadFile } from '../../hooks/useUploadFile'
import { Button } from '@material-ui/core'

export interface DataroomUploaderProps {
  documentInfo: UploadDocumentInfo
  onChange: (files: DataroomFile[]) => any
  multiple?: boolean
  buttonComponent?: JSX.Element
}

export const DataroomUploader = (props: DataroomUploaderProps) => {
  const { buttonComponent, onChange, multiple = false, documentInfo } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [uploadFile] = useUploadFile({
    onSuccess: response => onChange(response.data)
  })
  const handleChange = async () => {
    // eslint-disable-next-line
    if (
      inputRef.current !== null &&
      inputRef.current.files !== null &&
      inputRef.current.files.length > 0
    ) {
      await uploadFile({
        ...documentInfo,
        documents: Array.from(inputRef.current.files)
      })
    }
  }

  return (
    <>
      <input
        type='file'
        ref={inputRef}
        id='dataroom-uploader'
        multiple={multiple}
        onChange={handleChange}
        hidden
      />
      <label htmlFor='dataroom-uploader' style={{ display: 'block' }}>
        {buttonComponent ?? (
          <Button variant='contained' component='span'>
            Upload
          </Button>
        )}
      </label>
    </>
  )
}
