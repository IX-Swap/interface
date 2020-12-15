import React from 'react'
import { Button } from '@material-ui/core'

export interface DSOTeamRemoveButtonProps {
  remove: Function
  index: number
}

export const DSOTeamRemoveButton: React.FC<DSOTeamRemoveButtonProps> = ({
  remove,
  index
}) => {
  return <Button onClick={() => remove(index)}>Remove</Button>
}
