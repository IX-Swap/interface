import React from 'react'
import { Button, ButtonProps, Box } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { Icon } from 'ui/Icons/Icon'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const BackToDSOButton = (props: ButtonProps) => {
  const history = useHistory()
  const { isMobile } = useAppBreakpoints()

  return (
    <Box height='100%' display='flex' alignItems='center'>
      <Button
        {...props}
        endIcon={isMobile ? undefined : <Icon name='arrow-right' />}
        startIcon={isMobile ? <Icon name='arrow-left' /> : undefined}
        onClick={history.goBack}
        sx={{
          pl: {
            xs: 0,
            md: 4
          }
        }}
      >
        Back to DSO page
      </Button>
    </Box>
  )
}
