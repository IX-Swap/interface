import React from 'react'
import { IconButton } from '@mui/material'
import { Icon } from 'ui/Icons/Icon'
import useStyles from './DSOTeamRemoveButton.styles'

export interface DSOTeamRemoveButtonProps {
  remove: Function
  index: number
}

export const DSOTeamRemoveButton: React.FC<DSOTeamRemoveButtonProps> = ({
  remove,
  index
}) => {
  const classes = useStyles()
  return (
    <IconButton onClick={() => remove(index)} className={classes.button}>
      <Icon name={'trash'} />
    </IconButton>
  )
}
