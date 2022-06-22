import { Box, IconButton, Typography, InputLabel } from '@mui/material'
import React from 'react'
import { AvatarBox } from 'ui/FileUpload/AvatarBox'
import { FileProps } from 'ui/FileUpload/File'
import { Icon } from 'ui/Icons/Icon'
import { Avatar as AvatarComponent } from 'components/Avatar'
import { getDataroomFileId } from 'helpers/dataroom'
import { useFormContext } from 'react-hook-form'
import classNames from 'classnames'
import { isString } from 'lodash'

export const Avatar = ({
  hasError,
  isFileTooLarge,
  hasValue,
  label,
  placeHolder,
  name = '',
  rootProps,
  inputProps,
  disabled = false,
  setCompleted = (num: number) => {},
  value,
  completed = 0,
  readonly = false
}: FileProps) => {
  const { setValue } = useFormContext()
  const handleRemove = () => {
    setValue(name, undefined)
  }
  return (
    <Box>
      {label !== undefined && isString(label) && (
        <InputLabel>{label}</InputLabel>
      )}
      {label !== undefined && !isString(label) && <Box pb={1}>{label}</Box>}
      <AvatarBox
        className={classNames({
          hasError,
          isFileTooLarge,
          hasValue
        })}
      >
        <Box
          {...rootProps}
          width='100%'
          height='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
          top={0}
          left={0}
          sx={{
            cursor: 'pointer'
          }}
        >
          {value !== undefined ? (
            <AvatarComponent
              size={120}
              documentId={getDataroomFileId(value)}
              variant='square'
            />
          ) : (
            <>
              <Icon name='file' />
              <Typography
                className='label'
                sx={{ ml: 1, lineHeight: '24px', textAlign: 'center' }}
              >
                {placeHolder ?? label}
              </Typography>
            </>
          )}
          <input id={name} name={name} {...inputProps} disabled={disabled} />
        </Box>
        {value !== undefined && !readonly ? (
          <Box position='absolute' right={2} bottom={2}>
            <IconButton onClick={handleRemove}>
              <Icon name='trash' />
            </IconButton>
          </Box>
        ) : null}
      </AvatarBox>
    </Box>
  )
}
