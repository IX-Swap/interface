import { List, Box } from '@mui/material'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import React from 'react'
import { useStyles } from 'app/pages/accounts/pages/banks/pages/BanksList/ActionContent.styles'
import { NewAction } from 'app/pages/authorizer/components/NewAction'
export interface ActionContentProps extends DropdownContentProps {
  edit: () => void
  remove: () => void
  view: () => void
}

export const ActionContent = ({
  edit,
  remove,
  view,
  injectedProps
}: ActionContentProps) => {
  const classes = useStyles()
  return (
    <Box className={classes.wrapper}>
      <List data-testid='dropdown' onClick={injectedProps.close}>
        <NewAction label='View details' onClick={view} />
        <div className={classes.separator} />
        <NewAction label='Edit' onClick={edit} />
        <div className={classes.separator} />
        <NewAction label='Delete' onClick={remove} />
      </List>
    </Box>
  )
}
