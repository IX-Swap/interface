import { SvgIconComponent } from '@mui/icons-material'
import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'

interface ActionProps {
  label: string
  color?: string
  icon: SvgIconComponent
  onClick: () => void
}

export const Action: React.FC<ActionProps> = props => {
  const { label, color, icon, onClick } = props

  return (
    <ListItem button key={label} onClick={onClick}>
      <ListItemIcon style={{ minWidth: '40px', color: color }}>
        {React.createElement(icon)}
      </ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </ListItem>
  )
}
