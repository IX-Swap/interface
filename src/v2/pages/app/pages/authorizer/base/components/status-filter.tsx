import React from 'react'
import {
  ListItem, ListItemIcon, ListItemText
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/styles'

interface StatusFilterProps {
  children: React.ReactElement
  isSelected: boolean
  title: string
  handleItemClick: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const useStyles = makeStyles(() => ({
  selected: {
    color: '#0C469C'
  }
}))

const StatusFilter = ({ isSelected, children, title, handleItemClick }: StatusFilterProps) => {
  const classes = useStyles()
  return (
    <ListItem
      style={{ padding: '0 48px' }}
      classes={{
        selected: classes.selected
      }}
      button selected={isSelected}
      onClick={handleItemClick}
    >
      <ListItemIcon className={isSelected ? classes.selected : ''}>
        {children}
      </ListItemIcon>
      <ListItemText>
        {title}
      </ListItemText>
    </ListItem>
  )
}

export default StatusFilter
