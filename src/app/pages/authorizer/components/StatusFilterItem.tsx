import React, { createElement } from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface StatusFilterItemProps {
  isSelected: boolean
  title: string
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  onClick: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const StatusFilterItem: React.FC<StatusFilterItemProps> = ({
  isSelected,
  icon,
  title,
  onClick
}) => {
  const theme = useTheme()
  return (
    <ListItem
      style={{ padding: '2px 22px' }}
      button
      selected={isSelected}
      onClick={onClick}
    >
      <ListItemIcon>
        {createElement(icon, {
          style: {
            color: isSelected
              ? theme.palette.sidebar.activeColor
              : theme.palette.text.secondary
          }
        })}
      </ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </ListItem>
  )
}
