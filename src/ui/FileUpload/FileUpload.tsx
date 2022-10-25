import React, { useCallback, useState } from 'react'
import { UploadDocumentInfo, useUploadFile } from 'hooks/useUploadFile'
import { DataroomFile } from 'types/dataroomFile'
import { Maybe } from 'types/util'
import { useFormContext } from 'react-hook-form'
import { DataroomFileType } from 'config/dataroom'
import { useDropzone } from 'react-dropzone'
import { useFormError } from 'hooks/useFormError'
import { useServices } from 'hooks/useServices'
import { File } from 'ui/FileUpload/File'
import { Avatar } from 'ui/FileUpload/Avatar'
import { getIdFromObj } from 'helpers/strings'
import { useDeleteFile } from 'hooks/useDeleteFile'

export interface FileUploadProps {
  name: string
  defaultLabel?: string | React.ReactNode
  label: string | React.ReactNode
  placeHolder?: string | React.ReactNode
  value?: Maybe<DataroomFile | DataroomFile[]>
  onChange?: (files: DataroomFile | DataroomFile[]) => any
  documentInfo?: UploadDocumentInfo
  onDelete?: () => any
  multiple?: boolean
  accept?: DataroomFileType
  fullWidth?: boolean
  showAcceptable?: boolean
  disabled?: boolean
  size?: number | [number, number] | [string, string]
  uploadFunction?: any
  minSize?: number
  isValid?: boolean
  maxSize?: number
  remove?: () => void
  onSuccessUploadCallback?: (value: any) => void
  onRemoveCallback?: (value: any) => void
  readonly?: boolean
}

export const FileUpload = (props: FileUploadProps) => {
  const {
    label,
    placeHolder,
    documentInfo,
    value: defaultValue,
    name,
    onChange,
    accept = DataroomFileType.document,
    multiple = false,
    fullWidth = false,
    disabled = false,
    isValid = true,
    minSize = 0,
    maxSize = 10,
    remove,
    readonly = false
  } = props
  const { watch } = useFormContext()

  const value = watch(name, defaultValue) as FileUploadProps['value']
  const { snackbarService } = useServices()
  const { hasError } = useFormError(name)
  const [completed, setCompleted] = useState(0)

  const [deleteFile] = useDeleteFile(getIdFromObj(value))

  const handleRemove = async () => {
    await deleteFile()
    if (props.onRemoveCallback !== undefined) {
      props.onRemoveCallback(value)
    }
    if (remove !== undefined) {
      remove()
    }
  }

  const [uploadFile] = useUploadFile(
    {
      onSuccess: response => {
        if (!multiple && props.onSuccessUploadCallback !== undefined) {
          props.onSuccessUploadCallback(response.data[0])
        }
        onChange?.(
          multiple
            ? [...(Array.isArray(value) ? value : []), ...response.data]
            : response.data[0]
        )

        const message = `Successfully uploaded ${response?.data?.length} files`
        snackbarService.showSnackbar(message, 'success')
      },
      onError: error => {
        setCompleted(0)
        snackbarService.showSnackbar(error.message, 'error')
      }
    },
    undefined,
    undefined,
    setCompleted
  )

  const onDrop = useCallback(
    async acceptedFiles => {
      if (acceptedFiles.length > 0) {
        const payload = {
          ...documentInfo,
          documents: Array.from(acceptedFiles)
        }

        await uploadFile(payload as any)
      }
    },
    [documentInfo, uploadFile]
  )
  const _maxSize = maxSize * 1048576
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    noDrag: true,
    multiple,
    accept,
    minSize,
    maxSize: _maxSize
  })

  const hasValue =
    value !== undefined &&
    (value as DataroomFile).originalFileName !== undefined

  const isFileTooLarge =
    fileRejections.length > 0 && fileRejections[0].file.size > _maxSize

  const getLabelDisplay = () => {
    if (isFileTooLarge && fullWidth) {
      return `The selected file exceeds our size limit of ${maxSize}MB`
    }

    if (isFileTooLarge) {
      return `Max file size ${maxSize}MB`
    }

    if (multiple) {
      return label
    }
    if (hasValue) {
      return (value as DataroomFile).originalFileName
    }

    return label
  }

  const fileProps = {
    fullWidth,
    hasError,
    isFileTooLarge,
    hasValue,
    label: getLabelDisplay(),
    placeHolder,
    name,
    multiple,
    rootProps: getRootProps(),
    inputProps: getInputProps(),
    disabled,
    setCompleted,
    value,
    completed,
    remove: handleRemove,
    readonly
  }

  if (fullWidth) {
    return <File {...fileProps} hasError={!isValid} />
  }

  return <Avatar {...fileProps} />
}
