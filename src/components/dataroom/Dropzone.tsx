import React, { useCallback } from 'react'
import { UploadDocumentInfo, useUploadFile } from 'hooks/useUploadFile'
import { DataroomFile } from 'types/dataroomFile'
import { Maybe } from 'types/util'
import { useFormContext } from 'react-hook-form'
import { DataroomFileType } from 'config/dataroom'
import { Box, FormHelperText, Typography } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import { useAuth } from 'hooks/auth/useAuth'
import { useFormError } from 'hooks/useFormError'
import { getDataroomFileId } from 'helpers/dataroom'
import { useStyles } from './Dropzone.styles'
import { Avatar } from 'components/Avatar'
import { DropzoneFallback } from 'components/dataroom/DropzoneFallback'
import { hasValue } from 'helpers/forms'

export interface DropzoneProps {
  name: string
  label: string
  value: Maybe<DataroomFile>
  onChange: (files: DataroomFile) => any
  documentInfo: UploadDocumentInfo
  onDelete?: () => any
  multiple?: boolean
  accept?: DataroomFileType
}

export const Dropzone = (props: DropzoneProps) => {
  const {
    label,
    documentInfo,
    value: defaultValue,
    name,
    onChange,
    accept = DataroomFileType.document,
    multiple = false
  } = props
  const { watch } = useFormContext()
  const value = watch(name, defaultValue) as DropzoneProps['value']
  const [uploadFile] = useUploadFile({
    onSuccess: response => onChange(response.data[0])
  })
  const { user } = useAuth()
  const photoId = getDataroomFileId(value)
  const { hasError, error } = useFormError(name)
  const { container } = useStyles()

  const onDrop = useCallback(
    async acceptedFiles => {
      if (acceptedFiles.length > 0) {
        await uploadFile({
          ...documentInfo,
          documents: Array.from(acceptedFiles)
        })
      }
    },
    [documentInfo, uploadFile]
  )
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: multiple ? 0 : 1,
    multiple,
    accept
  })

  return (
    <>
      {label !== '' && label !== undefined ? (
        <Box mb={1}>
          <Typography variant='subtitle2' color='textSecondary'>
            {label}
          </Typography>
        </Box>
      ) : null}
      <Box
        component='div'
        width={128}
        height={128}
        className={container}
        {...(getRootProps() as any)}
      >
        <input id={name} name={name} {...getInputProps()} />
        <Avatar
          size={128}
          documentId={hasValue(value) ? photoId : undefined}
          ownerId={hasValue(value) ? user?._id : undefined}
          variant='square'
          fallback={<DropzoneFallback hasError={hasError} />}
        />
      </Box>
      {hasError ? <FormHelperText error>{error}</FormHelperText> : null}
    </>
  )
}
