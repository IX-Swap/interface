import React, { useCallback } from 'react'
import { UploadDocumentInfo, useUploadFile } from 'hooks/useUploadFile'
import { DataroomFile } from 'types/dataroomFile'
import { Maybe } from 'types/util'
import { useFormContext } from 'react-hook-form'
import { DataroomFileType } from 'config/dataroom'
import { Box, Typography } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import { useTheme } from '@material-ui/core/styles'
import { useAuth } from 'hooks/auth/useAuth'
import { useFormError } from 'hooks/useFormError'
import { getDataroomFileId } from 'helpers/dataroom'
import { ViewDocument } from 'app/components/DSO/components/ViewDocument'
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined'
import { useStyles } from './Dropzone.styles'
import { DataroomUploaderRenderProps } from 'components/dataroom/DataroomUploader'

export interface DropzoneProps {
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
  const { hasError } = useFormError(name)
  const theme = useTheme()
  const { acceptedImage, container, icon } = useStyles()

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
      <Box mb={1}>
        <Typography variant='subtitle2' color='textSecondary'>
          {label}
        </Typography>
      </Box>
      <Box width={128} height={128} className={container} {...getRootProps()}>
        <input id={name} name={name} {...getInputProps()} />
        {value !== undefined && user !== undefined ? (
          <ViewDocument documentId={photoId} ownerId={user._id}>
            {url =>
              url !== '' ? (
                <img src={url ?? ''} className={acceptedImage} alt={name} />
              ) : (
                <></>
              )
            }
          </ViewDocument>
        ) : (
          <Box
            paddingX={6}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            width='100%'
            height='100%'
            border={`1px ${
              hasError
                ? `solid ${theme.palette.error.main}`
                : `dashed ${theme.palette.text.secondary}`
            }`}
          >
            <BackupOutlinedIcon className={icon} />
            <Typography align='center' variant='caption' color='textSecondary'>
              Drop or Upload
            </Typography>
          </Box>
        )}
      </Box>
    </>
  )
}
