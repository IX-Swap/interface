import { SvgIconComponent } from '@mui/icons-material'
import React from 'react'
import {
  ListItem,
  ListItemIcon,
  // ListItemText,
  Typography
} from '@mui/material'

interface ActionProps {
  label: string
  color?: string
  icon?: SvgIconComponent
  onClick: () => void
  style?: object
}

export const Action: React.FC<ActionProps> = props => {
  const { color, label, icon, onClick, style } = props

  return (
    <ListItem
      button
      key={label}
      onClick={onClick}
      style={{
        ...style,
        padding: '12px 5px'
      }}
    >
      {icon && (
        <ListItemIcon style={{ minWidth: '40px', color: color }}>
          {React.createElement(icon)}
        </ListItemIcon>
      )}

      {/* <ListItemText>{label}</ListItemText> */}
      <Typography sx={{ color: '#778194' }}>{label}</Typography>
    </ListItem>
  )
}
