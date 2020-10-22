import React, { useRef } from 'react'
import { UploadDocumentInfo, useUploadFile } from 'v2/hooks/useUploadFile'
import { DataroomFile } from 'v2/types/dataroomFile'
import { Maybe } from 'v2/types/util'
import { useDeleteFile } from 'v2/hooks/useDeleteFile'
import { getDocumentId } from 'v2/components/form/DataroomDocument'
import { useFormContext } from 'react-hook-form'

export interface NewDataroomUploaderRenderProps {
  name: string
  value: DataroomFile
  handleUpload: () => void
  handleDelete: () => Promise<void>
}

export interface NewDataroomUploaderProps {
  name: string
  label: string
  value: DataroomFile
  onChange: (files: DataroomFile) => any
  documentInfo: UploadDocumentInfo
  render: (props: NewDataroomUploaderRenderProps) => Maybe<JSX.Element>
  onDelete?: () => any
  multiple?: boolean
}

export const NewDataroomUploader = (props: NewDataroomUploaderProps) => {
  const {
    label,
    documentInfo,
    value: defaultValue,
    name,
    onChange,
    onDelete,
    render,
    multiple = false
  } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { watch } = useFormContext()
  const value = watch(name, defaultValue) as NewDataroomUploaderProps['value']
  const document = value === undefined ? defaultValue : value
  const [deleteFile] = useDeleteFile(getDocumentId(value))
  const [uploadFile] = useUploadFile<DataroomFile[]>({
    onSuccess: response => onChange(response.data[0])
  })
  const handleUpload = () => {
    inputRef?.current?.click()
  }
  const handleDelete = async () => {
    await deleteFile()
    onDelete?.()
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
    }
  }

  return (
    <>
      <label style={{ display: 'none' }} htmlFor={name}>
        {label}
      </label>
      <input
        hidden
        ref={inputRef}
        accept='image/*'
        id={name}
        name={name}
        type='file'
        onChange={handleChange}
        multiple={multiple}
      />
      {render({ value: document, name, handleDelete, handleUpload })}
    </>
  )
}
