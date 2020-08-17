import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

interface StatusFilterProps {
  children: React.ReactNode
  isSelected: boolean
  title: string
  handleItemClick: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const useStyles = makeStyles(() => ({
  selected: {
    color: '#0C469C'
  },
  normal: {
    color: '#979797'
  }
}))

const StatusFilter = ({
  isSelected,
  children,
  title,
  handleItemClick
}: StatusFilterProps) => {
  const classes = useStyles()
  return (
    <ListItem
      style={{ padding: '2px 48px' }}
      classes={{
        selected: classes.selected
      }}
      button
      selected={isSelected}
      onClick={handleItemClick}
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

export default StatusFilter
