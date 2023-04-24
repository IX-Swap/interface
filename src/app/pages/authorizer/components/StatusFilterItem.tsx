import React, { createElement } from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { useHistory } from 'react-router-dom'
export interface StatusFilterItemProps {
  isSelected: boolean
  title: string
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  onClick: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export interface StatusFilterKycItemProps {
  isSelected: boolean
  title: string
  onClick: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const StatusFilterItem: React.FC<StatusFilterItemProps> = ({
  isSelected,
  icon,
  title,
  onClick
}) => {
  const theme = useTheme()
  const { location } = useHistory()
  return (
    <>
      {location?.pathname?.includes('individuals') ? (
        <ListItem
          style={{ width: '100px', background: 'none', textAlign: 'center' }}
          button
          selected={isSelected}
          onClick={onClick}
        >
          <ListItemText>{title}</ListItemText>
        </ListItem>
      ) : (
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
      )}
    </>
  )
}
