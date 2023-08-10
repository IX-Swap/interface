import { List } from '@mui/material'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import React from 'react'
import { Action } from 'app/pages/authorizer/components/Action'
import { useTheme } from '@mui/styles'
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
  const theme = useTheme()

  return (
    <List data-testid='dropdown' onClick={injectedProps.close}>
      <Action
        label='View details'
        onClick={view}
        style={{
          borderBottom: `1px solid ${theme.palette.table.border}`
        }}
      />
      <Action
        label='Edit'
        onClick={edit}
        style={{
          borderBottom: `1px solid ${theme.palette.table.border}`
        }}
      />
      <Action label='Delete' onClick={remove} />
    </List>
  )
}
