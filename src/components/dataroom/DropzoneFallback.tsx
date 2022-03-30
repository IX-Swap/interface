import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { Icon } from 'ui/Icons/Icon'

export interface DropzoneFallbackProps {
  hasError: boolean
  multiple?: boolean
  type?: 'banner' | 'document'
}

export const DropzoneFallback = ({
  hasError,
  multiple = false,
  type = 'document'
}: DropzoneFallbackProps) => {
  const theme = useTheme()
  const isBanner = type === 'banner'

  const borderStyle = hasError ? 'solid' : 'dashed'
  const normalBorderColor = isBanner ? ' #C4C4C4' : theme.palette.divider
  const borderColor = hasError ? theme.palette.error.main : normalBorderColor

  const getDropzoneText = () => {
    if (isBanner) {
      return (
        <Typography
          align='center'
          variant='body1'
          sx={{ color: '#444444', fontSize: 18, mt: 1 }}
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
      )
    }

    return (
      <Typography
        align='center'
        variant='caption'
        color='textSecondary'
        sx={{ mt: 1 }}
      >
        Drag and Drop
        <br /> or{' '}
        <Box component='span' sx={{ color: '#4C88FF' }}>
          Upload
        </Box>
      </Typography>
    )
  }

  return (
    <Box
      paddingX={6}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      width='100%'
      height='100%'
      bgcolor={type === 'banner' ? '#EDEDED' : 'initial'}
      border={`1px ${borderStyle} ${borderColor}`}
      borderRadius='16px'
      boxSizing='border-box'
    >
      <Icon
        name='upload'
        color='#4C88FF'
        size={type === 'banner' ? 96 : undefined}
      />
      {getDropzoneText()}
    </Box>
  )
}
