import { SvgIconComponent } from '@material-ui/icons'
import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

interface ActionProps {
  label: string
  icon: SvgIconComponent
  onClick: () => void
}

export const Action: React.FC<ActionProps> = props => {
  const { label, icon, onClick } = props

  return (
    <ListItem button key={label} onClick={onClick}>
      <ListItemIcon style={{ minWidth: '40px' }}>
        {React.createElement(icon)}
      </ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </ListItem>
  )
}
