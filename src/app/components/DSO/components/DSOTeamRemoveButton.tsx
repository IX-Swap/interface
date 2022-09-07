import React from 'react'
import { IconButton, IconButtonProps } from '@mui/material'
import { Icon } from 'ui/Icons/Icon'
import useStyles from './DSOTeamRemoveButton.styles'

export interface DSOTeamRemoveButtonProps extends IconButtonProps {
  remove: Function
  index: number
}

export const DSOTeamRemoveButton: React.FC<DSOTeamRemoveButtonProps> = ({
  remove,
  index,
  ...props
}) => {
  const classes = useStyles()
  return (
    <IconButton
      {...props}
      onClick={() => remove(index)}
      className={classes.button}
    >
      <Icon name={'trash'} />
    </IconButton>
  )
}
