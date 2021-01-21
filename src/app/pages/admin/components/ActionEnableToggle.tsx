import React from 'react'
import { ButtonError } from 'app/components/ButtonError'
import { DialogEnabledToggle } from 'app/pages/admin/components/DialogEnabledToggle'
import { useUserActionsDialog } from 'app/pages/admin/hooks/useUserActionsDialog'
import { Button } from '@material-ui/core'

export interface ActionEnableToggleProps {
  enabled: boolean
}

export const ActionEnableToggle = ({ enabled }: ActionEnableToggleProps) => {
  const {
    enabledToggleOpen,
    closeEnabledToggle,
    openEnabledToggle
  } = useUserActionsDialog()

  return (
    <>
      {enabled ? (
        <ButtonError
          onClick={openEnabledToggle}
          variant='contained'
          disableElevation
        >
          DISABLE
        </ButtonError>
      ) : (
        <Button
          onClick={openEnabledToggle}
          variant='contained'
          disableElevation
          color='primary'
        >
          ENABLE
        </Button>
      )}
      <DialogEnabledToggle
        enabled={enabled}
        closeDialog={closeEnabledToggle}
        open={enabledToggleOpen}
      />
    </>
  )
}
