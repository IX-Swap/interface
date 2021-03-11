import { Box, Typography } from '@material-ui/core'
import { DoneLabel } from 'app/pages/home/components/DoneLabel'
import { AppRouterLink } from 'components/AppRouterLink'
import React, { createElement } from 'react'
import { LandingPageLink } from 'ui/LandingPageLink'
import { RoundedIconWrapper } from 'ui/RoundedIconWrapper'

export interface OnboardingLinkProps {
  icon: any
  label: string
  link: string
  color: string
  done?: boolean
}

export const OnboardingLink = (props: OnboardingLinkProps) => {
  const { icon, label, link, color, done = false } = props

  return (
    <AppRouterLink to={link}>
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
