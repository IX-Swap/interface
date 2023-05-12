import React from 'react'
import { ListItem, ListItemText, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
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
  title,
  onClick
}) => {
  return (
    <ListItem
      style={{ width: '100px', background: 'none', textAlign: 'center' }}
      button
      selected={isSelected}
      onClick={onClick}
    >
      <ListItemText>{title}</ListItemText>
    </ListItem>
  )
}
