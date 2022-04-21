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
  label?: string
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
  remove
}: FileProps) => {
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
          {label}
        </Typography>
      </Box>
      {(!multiple || isDisplay) && value !== undefined ? (
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
          <Typography sx={{ cursor: 'pointer' }} color='primary'>
            Browse
          </Typography>
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
