import React, { forwardRef, Ref } from 'react'
import {
  LinkProps as MUILinkProps,
  Typography,
  Link as MUILink
} from '@mui/material'
import { Link, LinkProps } from 'react-router-dom'
import { safeGeneratePath } from 'helpers/router'

export interface AppRouterLinkProps {
  to: string
  params?: {}
  disabled?: boolean
  replace?: boolean
}

export const AppRouterLink: React.FC<
  Omit<LinkProps, 'to'> & MUILinkProps & AppRouterLinkProps
> = forwardRef((props, ref: Ref<any>) => {
  const {
    to,
    params,
    children,
    disabled = false,
    underline = 'none',
    ...rest
  } = props

  if (disabled) {
    return <Typography>{children}</Typography>
  }

  return (
    <MUILink
      {...rest}
      ref={ref}
      underline={underline}
      component={Link}
      to={{
        pathname: params === undefined ? to : safeGeneratePath(to, params),
        state: params
      }}
    >
      {children}
    </MUILink>
  )
})

export const AppRouterLinkComponent = forwardRef(
  (props: AppRouterLinkProps, ref: Ref<any>) => {
    return <AppRouterLink {...props} ref={ref} />
  }
)
