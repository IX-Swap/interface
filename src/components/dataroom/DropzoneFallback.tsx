import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './Dropzone.styles'
import classNames from 'classnames'

export interface DropzoneFallbackProps {
  hasError: boolean
  multiple?: boolean
  isNewThemeOn?: boolean
}

export const DropzoneFallback = ({
  hasError,
  multiple = false,
  isNewThemeOn = false
}: DropzoneFallbackProps) => {
  const theme = useTheme()
  const { icon, bigIcon } = useStyles()

  const borderStyle = hasError ? 'solid' : 'dashed'
  const borderColor = hasError
    ? theme.palette.error.main
    : isNewThemeOn
    ? ' #C4C4C4'
    : theme.palette.text.secondary

  return (
    <Box
      paddingX={6}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      width='100%'
      height='100%'
      style={{ backgroundColor: isNewThemeOn ? '#EDEDED' : 'initial' }}
      border={`1px ${borderStyle} ${borderColor}`}
    >
      <BackupOutlinedIcon
        className={classNames(icon, { [bigIcon]: isNewThemeOn })}
      />
      {isNewThemeOn ? (
        <Typography
          align='center'
          variant='body1'
          style={{ color: '#444444', fontSize: 18 }}
        >
          Drag and Drop your files here or{' '}
          <b
            style={{
              textDecoration: 'underline',
              color: theme.palette.primary.main
            }}
          >
            browse
          </b>{' '}
          to upload
        </Typography>
      ) : (
        <Typography align='center' variant='caption' color='textSecondary'>
          {multiple ? 'You can drag and drop multiple files at once' : 'Drop'}{' '}
          <br /> or <br />
          Upload
        </Typography>
      )}
    </Box>
  )
}
