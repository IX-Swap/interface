import React from 'react'
import { Button } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { ButtonPropsVariantOverrides } from '@mui/material/Button/Button'
import { OverridableStringUnion } from '@mui/types'
import { ReactComponent as EditIcon } from 'assets/icons/kyc-accreditation/edit.svg'

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
  showIcon?: boolean
  sx?: object
}

export const EditButton: React.FC<EditButtonProps> = ({
  link,
  params = {},
  replace = false,
  variant = 'outlined',
  fullWidth = false,
  customLabel = false,
  showIcon = false,
  sx = {},
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
    sx={sx}
    {...rest}
  >
    {showIcon && <EditIcon style={{ fill: '#fff', marginRight: '10px' }} />}
    {customLabel ? children : 'Edit'}
  </Button>
)
