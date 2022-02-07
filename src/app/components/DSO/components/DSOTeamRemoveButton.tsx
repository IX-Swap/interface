import React from 'react'
import { Button } from '@mui/material'

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
