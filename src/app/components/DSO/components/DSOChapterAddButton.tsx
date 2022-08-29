import React from 'react'
import { Button } from '@mui/material'
import { Icon } from 'ui/Icons/Icon'

export interface DSOTeamAddButtonProps {
  append: Function
  text?: string
}

export const DSOChapterAddButton: React.FC<DSOTeamAddButtonProps> = props => {
  const { append, text = 'Add Team Member' } = props
  const handleClick = () => {
    append({})
  }

  return (
    <Button color='primary' variant='outlined' onClick={handleClick}>
      <Icon name={'plus'} style={{ marginRight: 8 }} /> {text}
    </Button>
  )
}
