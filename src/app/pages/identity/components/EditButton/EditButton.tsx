import React from 'react'
import { Button } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { ButtonPropsVariantOverrides } from '@mui/material/Button/Button'
import { OverridableStringUnion } from '@mui/types'

export interface EditButtonProps {
  link: string
  params?: object
  replace?: boolean
  fullWidth?: boolean
  variant?: OverridableStringUnion<
    'text' | 'outlined' | 'contained',
    ButtonPropsVariantOverrides
  >
  customLabel?: boolean
}

export const EditButton: React.FC<EditButtonProps> = ({
  link,
  params = {},
  replace = false,
  variant = 'outlined',
  fullWidth = false,
  customLabel = false,
  children,
  ...rest
}) => (
  <Button
    component={AppRouterLinkComponent}
    color='primary'
    variant={variant}
    to={link}
    params={params}
    replace={replace}
    disableElevation
    fullWidth={fullWidth}
    {...rest}
  >
    {customLabel ? children : 'Edit'}
  </Button>
)
