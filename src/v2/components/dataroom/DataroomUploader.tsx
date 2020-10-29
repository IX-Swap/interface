import React, { useRef } from 'react'
import { UploadDocumentInfo, useUploadFile } from 'v2/hooks/useUploadFile'
import { DataroomFile } from 'v2/types/dataroomFile'
import { Maybe } from 'v2/types/util'
import { useDeleteFile } from 'v2/hooks/useDeleteFile'
import { useFormContext } from 'react-hook-form'
import { getIdFromObj } from 'v2/helpers/strings'
import { DataroomFileType } from 'v2/config/dataroom'
import { MutationResult } from 'react-query'
import { AxiosResponse } from 'axios'

export interface DataroomUploaderRenderProps<TValue = Maybe<DataroomFile>> {
  name: string
  value: TValue
  handleUpload: () => void
  handleDelete: () => Promise<void>
  documentInfo: UploadDocumentInfo
  deleteState: MutationResult<AxiosResponse<DataroomFile>>
  uploadState: MutationResult<AxiosResponse<DataroomFile[]>>
}

export interface DataroomUploaderProps {
  name: string
  label: string
  value: Maybe<DataroomFile>
  onChange: (files: DataroomFile) => any
  render: (props: DataroomUploaderRenderProps) => Maybe<JSX.Element>
  documentInfo: UploadDocumentInfo
  onDelete?: () => any
  multiple?: boolean
  accept?: DataroomFileType
}

export const DataroomUploader = (props: DataroomUploaderProps) => {
  const {
    label,
    documentInfo,
    value: defaultValue,
    name,
    onChange,
    onDelete,
    render,
    accept = DataroomFileType.all,
    multiple = false
  } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { watch } = useFormContext()
  const value = watch(name, defaultValue) as DataroomUploaderProps['value']
  const document = value === undefined ? defaultValue : value
  const [deleteFile, deleteState] = useDeleteFile(getIdFromObj(value))
  const [uploadFile, uploadState] = useUploadFile({
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
        accept={accept}
        id={name}
        name={name}
        type='file'
        onChange={handleChange}
        multiple={multiple}
      />
      {render({
        value: document,
        name,
        handleDelete,
        handleUpload,
        documentInfo,
        deleteState,
        uploadState
      })}
    </>
  )
}
