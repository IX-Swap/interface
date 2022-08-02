import { ListItem, ListItemIcon, Typography } from '@mui/material'
import React from 'react'
import { useStyles } from 'app/pages/authorizer/components/NewAction.styles'

export interface NewActionProps {
  label: string
  icon?: React.ReactElement
  onClick: () => void
}

export const NewAction: React.FC<NewActionProps> = props => {
  const { label, icon, onClick } = props
  const classes = useStyles()
  return (
    <ListItem button key={label} onClick={onClick} style={{ padding: 0 }}>
      {icon !== undefined && (
        <ListItemIcon style={{ minWidth: '40px' }}>{icon}</ListItemIcon>
      )}
      <Typography className={classes.title}>{label}</Typography>
    </ListItem>
  )
}
