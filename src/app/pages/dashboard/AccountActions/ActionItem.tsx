import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

interface ActionItemProps {
  icon: any
  title: string
  description: string
  buttonText: string
  buttonLink: string
  params?: object
  hideButton?: boolean
}

export const ActionItem = ({
  icon,
  title,
  description,
  buttonText,
  buttonLink,
  params = {},
  hideButton = false
}: ActionItemProps) => {
  return (
    <Box textAlign={'center'} mx={'auto'} my={5} maxWidth={290}>
      {icon}
      <Typography variant='h5' color={'otpInput.color'} mt={3}>
        {title}
      </Typography>
      <Typography color={'text.secondary'} mt={2} mx={2} mb={3}>
        {description}
      </Typography>
      {!hideButton && (
        <Button
          component={AppRouterLinkComponent}
          color='primary'
          variant={'contained'}
          to={buttonLink}
          params={params}
          disableElevation
          fullWidth
        >
          {buttonText}
        </Button>
      )}
    </Box>
  )
}
