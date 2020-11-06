import { SvgIconComponent } from '@material-ui/icons'
import React from 'react'
import { useStyles } from 'v2/app/pages/authorizer/components/styles'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

interface ActionProps {
  label: string
  icon: SvgIconComponent
  onClick: () => void
}

export const Action: React.FC<ActionProps> = props => {
  const { label, icon, onClick } = props
  const classes = useStyles()

  return (
    <ListItem
      className={classes.popoverListItem}
      button
      key={label}
      onClick={onClick}
    >
      <ListItemIcon
        className={classes.popoverDark}
        style={{ minWidth: '40px' }}
      >
        {React.createElement(icon)}
      </ListItemIcon>
      <ListItemText className={classes.popoverText}>{label}</ListItemText>
    </ListItem>
  )
}
