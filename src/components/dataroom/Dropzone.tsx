import React, { useCallback } from 'react'
import { UploadDocumentInfo, useUploadFile } from 'hooks/useUploadFile'
import { DataroomFile } from 'types/dataroomFile'
import { Maybe } from 'types/util'
import { useFormContext } from 'react-hook-form'
import { DataroomFileType } from 'config/dataroom'
import { Box, FormHelperText, Typography } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import { useFormError } from 'hooks/useFormError'
import { useStyles } from './Dropzone.styles'
import { hasValue } from 'helpers/forms'
import { DropzoneDisplay } from 'components/dataroom/DropzoneDisplay'
import { DropzoneAcceptableFiles } from 'components/dataroom/DropzoneAcceptableFiles'

export interface DropzoneProps {
  name: string
  label: string
  value?: Maybe<DataroomFile | DataroomFile[]>
  onChange: (files: DataroomFile | DataroomFile[]) => any
  documentInfo: UploadDocumentInfo
  onDelete?: () => any
  multiple?: boolean
  accept?: DataroomFileType
  fullWidth?: boolean
  showAcceptable?: boolean
}

export const Dropzone = (props: DropzoneProps) => {
  const {
    label,
    documentInfo,
    value: defaultValue,
    name,
    onChange,
    accept = DataroomFileType.document,
    multiple = false,
    fullWidth = false,
    showAcceptable = false
  } = props
  const { watch } = useFormContext()
  const value = watch(name, defaultValue) as DropzoneProps['value']
  const { hasError, error } = useFormError(name)
  const { container } = useStyles()

  const [uploadFile] = useUploadFile({
    onSuccess: response => {
      onChange(
        multiple
          ? [...(Array.isArray(value) ? value : []), ...response.data]
          : response.data[0]
      )
    }
  })

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
    multiple,
    accept
  })

  return (
    <>
      {hasValue(label) ? (
        <Box mb={1} width={fullWidth ? '100%' : 128}>
          <Typography variant='subtitle2' color='textSecondary'>
            <Box fontWeight='500' component='span'>
              {label}
            </Box>
          </Typography>
        </Box>
      ) : null}
      <Box
        component='div'
        width={fullWidth ? '100%' : 128}
        height={128}
        className={container}
        {...(getRootProps() as any)}
      >
        <input id={name} name={name} {...getInputProps()} />
        <DropzoneDisplay
          multiple={multiple}
          hasError={hasError}
          value={value}
        />
      </Box>
      {hasError ? (
        <FormHelperText error>{error?.message}</FormHelperText>
      ) : (
        <DropzoneAcceptableFiles
          showAcceptable={showAcceptable}
          accept={accept}
        />
      )}
    </>
  )
}
