import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { ReactComponent as RetryImage } from 'assets/images/accreditation.svg'
import { useStyles } from './AccreditationCTA.styles'

export interface AccreditationCTAProps {
  link: string
  params: any
  retry?: boolean
}

export const AccreditationCTA = (props: AccreditationCTAProps) => {
  const { link, params, retry = false } = props
  const { container, description, link: linkClass } = useStyles()

  return (
    <Box className={container}>
      <RetryImage />
      <Typography variant='h5'>
        {!retry
          ? 'Apply for Investor Accreditation'
          : 'Retry to Apply for Investor Accreditation'}
      </Typography>
      <Typography className={description}>
        {!retry ? (
          <span>
            Complete your financial information to access
            <br />
            exclusive deals for accredited investors.
          </span>
        ) : (
          <span>
            Your previous submission has been rejected.
            <br />
            Please try again.
          </span>
        )}
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
        {!retry ? 'Become an Accredited Investor' : 'Try Again'}
      </Button>
    </Box>
  )
}
