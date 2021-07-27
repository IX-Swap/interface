import React from 'react'
import { Typography } from '@material-ui/core'
import { AppRouterLink } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { useParams } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles'

export interface PageHeaderProps {
  title?: string
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title } = props
  const theme = useTheme()
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()

  return (
    <AppRouterLink
      to={IssuanceRoute.view}
      component={Typography}
      params={{
        dsoId,
        issuerId
      }}
      color='textPrimary'
      underline='none'
      variant='h3'
      style={{
        display: 'block',
        fontWeight: 500,
        fontSize: theme.spacing(3),
        marginTop: theme.spacing(3.5),
        marginBottom: theme.spacing(5)
      }}
    >
      {title}
    </AppRouterLink>
  )
}
