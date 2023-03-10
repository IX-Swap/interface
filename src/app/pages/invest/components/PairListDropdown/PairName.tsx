import { Typography } from '@mui/material'
// import { useAppTheme } from 'hooks/useAppTheme'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import useStyles from './PairListDropdown.styles'
export interface PairNameProps {
  pairName: string
  handleClick?: (event: React.MouseEvent<HTMLElement>) => void
  hideDropdown?: boolean
}

export const PairName = ({
  pairName,
  handleClick,
  hideDropdown = false
}: PairNameProps) => {
  const classes = useStyles()
  //   const { theme } = useAppTheme()

  return (
    <Typography
      data-testid={'pairName'}
      variant='h5'
      className={classes.pairName}
      //   color='primary'
      onClick={handleClick}
    >
      {pairName}
      {!hideDropdown && (
        <Icon
          name='switch-down'
          size={22}
          //   color={theme.palette.primary.main}
          className={classes.icon}
        />
      )}
    </Typography>
  )
}
