import { Box, LinearProgress, Typography } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import { DataroomFile } from 'types/dataroomFile'
import { Maybe } from 'types/util'
import { Actions } from 'ui/FileUpload/Actions'
import { FileUploadBox } from 'ui/FileUpload/FileUploadBox'
import { Icon } from 'ui/Icons/Icon'

export interface FileProps {
  hasError?: boolean
  isFileTooLarge?: boolean
  hasValue?: boolean
  label?: string | React.ReactNode
  placeHolder?: string
  name?: string
  multiple?: boolean
  rootProps?: any
  inputProps?: any
  disabled?: boolean
  setCompleted?: (completed: number) => void
  value?: Maybe<DataroomFile | DataroomFile[]>
  completed?: number
  readonly?: boolean
  isDisplay?: boolean
  isFileMissed?: boolean
  remove?: () => void
}

export const File = ({
  hasError,
  isFileTooLarge,
  hasValue,
  label,
  name = '',
  multiple = false,
  rootProps,
  inputProps,
  disabled = false,
  setCompleted = (num: number) => {},
  value,
  completed = 0,
  readonly = false,
  isDisplay = false,
  remove,
  isFileMissed = false
}: FileProps) => {
  const renderLabel = () => {
    if (isFileMissed) {
      return 'Missing file'
    }
    if (
      (!multiple &&
        value != null &&
        Object.keys(value as DataroomFile).length > 0) ||
      (value as DataroomFile)?.originalFileName !== undefined
    ) {
      return (value as DataroomFile)?.originalFileName
    }
    return label
  }

  return (
    <FileUploadBox
      component='div'
      width='100%'
      height={80}
      className={classNames({
        hasError,
        isFileTooLarge,
        hasValue
      })}
    >
      <Box display='flex' alignItems='center'>
        <Icon name='file' />
        <Typography className='label' sx={{ ml: 1, lineHeight: '24px' }}>
          {renderLabel()}
        </Typography>
      </Box>
      {(!multiple || isDisplay) &&
      value !== undefined &&
      (value as DataroomFile)?.originalFileName !== undefined ? (
        <Actions
          name={name}
          document={value as DataroomFile}
          readonly={readonly}
          setCompleted={setCompleted}
          multiple={multiple}
          remove={remove}
        />
      ) : (
        <Box {...rootProps}>
          {!isFileMissed && (
            <Typography sx={{ cursor: 'pointer' }} color='primary'>
              Browse
            </Typography>
          )}

          <input
            id={name}
            name={name}
            {...inputProps}
            disabled={disabled}
            hidden
          />
        </Box>
      )}
      <Box position='absolute' bottom={0} left={0} width='100%'>
        <LinearProgress
          variant='determinate'
          value={completed}
          color={completed === 100 ? 'success' : 'primary'}
        />
      </Box>
    </FileUploadBox>
  )
}
