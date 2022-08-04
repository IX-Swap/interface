import { Link, Typography } from '@mui/material'
import React from 'react'
import { useStyles } from 'app/components/Header/components/Navigation/TopbarLinkContainer/TopbarLinkContainer.styles'
import { TopbarLinkProps } from './TopbarLinkContainer'

export const ExternalNavigationLink = ({
  link,
  label,
  placement
}: TopbarLinkProps) => {
  const classes = useStyles({
    isActive: false,
    disabled: false,
    placement
  })
  return (
    <Link href={link} className={classes.wrapper} target={'_blank'}>
      <Typography className={classes.text} variant={'body1'}>
        {label}
      </Typography>
    </Link>
  )
}
