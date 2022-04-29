import { Typography } from '@mui/material'
import { useAppTheme } from 'hooks/useAppTheme'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import useStyles from './PairListDropdown.styles'
export interface PairNameProps {
  pairName: string
  handleClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export const PairName = ({ pairName, handleClick }: PairNameProps) => {
  const classes = useStyles()
  const { theme } = useAppTheme()
  return (
    <Typography
      data-testid={'pairName'}
      variant='subtitle1'
      className={classes.pairName}
      color='primary'
      onClick={handleClick}
    >
      {pairName}

      <Icon
        name='switch-down'
        size={22}
        color={theme.palette.primary.main}
        className={classes.icon}
      />
    </Typography>
  )
}
