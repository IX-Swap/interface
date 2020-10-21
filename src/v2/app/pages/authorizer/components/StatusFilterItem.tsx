import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export interface StatusFilterItemProps {
  isSelected: boolean
  title: string
  onClick: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const StatusFilterItem: React.FC<StatusFilterItemProps> = ({
  isSelected,
  children,
  title,
  onClick
}) => {
  const classes = useStyles()

  return (
    <ListItem
      style={{ padding: '2px 22px' }}
      classes={{
        selected: classes.selected
      }}
      button
      selected={isSelected}
      onClick={onClick}
    >
      <ListItemIcon className={isSelected ? classes.selected : classes.normal}>
        {children}
      </ListItemIcon>
      <ListItemText className={isSelected ? classes.selected : classes.normal}>
        {title}
      </ListItemText>
    </ListItem>
  )
}

const useStyles = makeStyles(() => ({
  selected: {
    color: '#0C469C'
  },
  normal: {
    color: '#979797'
  }
}))
