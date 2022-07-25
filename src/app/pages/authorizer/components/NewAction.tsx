import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

interface NewActionProps {
  label: string
  icon: React.ReactElement
  onClick: () => void
}

export const NewAction: React.FC<NewActionProps> = props => {
  const { label, icon, onClick } = props

  return (
    <ListItem button key={label} onClick={onClick} style={{ padding: 0 }}>
      <ListItemIcon style={{ minWidth: '40px' }}>{icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </ListItem>
  )
}
