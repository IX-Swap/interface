import React from 'react'
import { Button } from '@material-ui/core'

export interface DSOTeamAddButtonProps {
  append: Function
}

export const DSOTeamAddButton: React.FC<DSOTeamAddButtonProps> = props => {
  const { append } = props
  const handleClick = () => {
    append()
  }

  return (
    <Button color='primary' variant='contained' onClick={handleClick}>
      Add Team Member
    </Button>
  )
}
