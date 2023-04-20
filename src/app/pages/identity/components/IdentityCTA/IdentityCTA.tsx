import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { ReactComponent as RetryImage } from 'assets/images/identity.svg'
import { useStyles } from './IdentityCTA.styles'

export interface IdentityCTAProps {
  link: string
  params: any
}

export const IdentityCTA = (props: IdentityCTAProps) => {
  const { link, params } = props
  const { container, description, link: linkClass } = useStyles()

  return (
    <Box className={container}>
      <RetryImage />
      <Typography variant='h5'>Retry Investor Identity Creation</Typography>
      <Typography className={description}>
        Your previous submission has been rejected.
        <br />
        Please try again.
      </Typography>
      <Button
        color='primary'
        variant={'contained'}
        className={linkClass}
        component={AppRouterLinkComponent}
        to={link}
        params={params}
        disableElevation
      >
        Try Again
      </Button>
    </Box>
  )
}
