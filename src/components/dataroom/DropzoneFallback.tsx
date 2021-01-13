import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './Dropzone.styles'

export interface DropzoneFallbackProps {
  hasError: boolean
}

export const DropzoneFallback = ({ hasError }: DropzoneFallbackProps) => {
  const theme = useTheme()
  const { icon } = useStyles()

  return (
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
  )
}
