import React from 'react'
import { Button } from '@material-ui/core'

export interface DSOTeamAddButtonProps {
  append: Function
}

export const DSOTeamAddButton: React.FC<DSOTeamAddButtonProps> = ({
  append
}) => {
  return (
    <Button color='primary' variant={'contained'} onClick={() => append({})}>
      Add Team Member
    </Button>
  )
}
