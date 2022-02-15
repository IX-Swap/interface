import React, { useRef } from 'react'
import { DataroomFileType } from 'config/dataroom'
import { UploadDocumentInfo, useUploadFile } from 'hooks/useUploadFile'
import { DataroomFile } from 'types/dataroomFile'
import { Maybe } from 'types/util'

export interface UploadRendererProps {
  onClick: () => void
  isLoading: boolean
}

export interface UploadAndAppendProps {
  label: string
  append: (value: DataroomFile) => void
  documentInfo: UploadDocumentInfo
  render: (props: UploadRendererProps) => Maybe<JSX.Element>
  multiple?: boolean
  accept?: DataroomFileType
}

export const DataroomUploadAndAppend = (props: UploadAndAppendProps) => {
  const {
    label,
    accept = DataroomFileType.all,
    append,
    documentInfo,
    multiple = false,
    render
  } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [uploadFile, { isLoading }] = useUploadFile({
    onSuccess: response => {
      multiple
        ? response.data.forEach(file => append(file))
        : append(response.data[0])
    }
  })

  const handleUpload = () => {
    inputRef?.current?.click()
  }

  const handleChange = async () => {
    if (
      // eslint-disable-next-line
      inputRef.current !== null &&
      inputRef.current.files !== null &&
      inputRef.current.files.length > 0
    ) {
      await uploadFile({
        ...documentInfo,
        documents: Array.from(inputRef.current.files)
      })
      inputRef.current.value = ''
    }
  }

  return (
    <>
      <label style={{ display: 'none' }} htmlFor={label}>
        {label}
      </label>
      <input
        hidden
        ref={inputRef}
        accept={accept}
        id='dataroom-upload-and-append'
        name={label}
        type='file'
        onChange={handleChange}
        multiple={multiple}
      />
      {render({ onClick: handleUpload, isLoading })}
    </>
  )
}
