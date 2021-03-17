import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './Dropzone.styles'

export interface DropzoneFallbackProps {
  hasError: boolean
  multiple?: boolean
}

export const DropzoneFallback = ({
  hasError,
  multiple = false
}: DropzoneFallbackProps) => {
  const theme = useTheme()
  const { icon } = useStyles()

  const borderStyle = hasError ? 'solid' : 'dashed'
  const borderColor = hasError
    ? theme.palette.error.main
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
      border={`1px ${borderStyle} ${borderColor}`}
    >
      <BackupOutlinedIcon className={icon} />
      <Typography align='center' variant='caption' color='textSecondary'>
        {multiple ? 'You can drag and drop multiple files at once' : 'Drop'}{' '}
        <br /> or <br />
        Upload
      </Typography>
    </Box>
  )
}
