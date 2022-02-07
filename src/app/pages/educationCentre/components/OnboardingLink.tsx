import { Box, Typography } from '@mui/material'
import { DoneLabel } from 'app/pages/educationCentre/components/DoneLabel'
import { AppRouterLink, AppRouterLinkProps } from 'components/AppRouterLink'
import React, { createElement } from 'react'
import { LandingPageLink } from 'ui/LandingPageLink'
import { RoundedIconWrapper } from 'ui/RoundedIconWrapper'

export interface OnboardingLinkProps extends AppRouterLinkProps {
  icon: any
  label: string
  color: string
  done?: boolean
}

export const OnboardingLink = (props: OnboardingLinkProps) => {
  const { icon, label, to, params, color, done = false } = props

  return (
    <AppRouterLink to={to} params={params} disabled={done}>
      <LandingPageLink>
        <RoundedIconWrapper component='span' color={color}>
          {createElement(icon, { color: 'currentColor' })}
        </RoundedIconWrapper>

        <Box my={0.6} />

        <Typography variant='subtitle1' color='textPrimary'>
          {label}
        </Typography>

        {done ? <DoneLabel /> : null}
      </LandingPageLink>
    </AppRouterLink>
  )
}
