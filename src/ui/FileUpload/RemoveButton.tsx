import { IconButton } from '@mui/material'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import { useFormContext } from 'react-hook-form'

export interface RemoveButtonProps {
  name: string
  setCompleted: (completed: number) => void
  remove?: () => void
}

export const RemoveButton = ({
  name,
  remove,
  setCompleted
}: RemoveButtonProps) => {
  const { setValue } = useFormContext()
  const handleDelete = () => {
    if (remove !== undefined) {
      remove()
      return
    }

    setValue(name, undefined)
    setCompleted(0)
  }

  return (
    <IconButton onClick={handleDelete} size='large'>
      <Icon name='trash' />
    </IconButton>
  )
}
