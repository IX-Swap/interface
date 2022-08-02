import { Button } from '@mui/material'
import { useStyles } from 'app/components/BackLink/BackLink.styles'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'

export interface BackLinkProps {
  title: string
  to: string
  hideTitleOnMobile?: boolean
}
export const BackLink = ({
  title,
  to,
  hideTitleOnMobile = false
}: BackLinkProps) => {
  const { backText } = useStyles()
  const { isTablet } = useAppBreakpoints()
  const hideTitle = isTablet && hideTitleOnMobile
  return (
    <Button
      variant='text'
      className={backText}
      component={AppRouterLinkComponent}
      to={to}
      startIcon={<Icon name='arrow-left' />}
    >
      {!hideTitle && title}
    </Button>
  )
}
