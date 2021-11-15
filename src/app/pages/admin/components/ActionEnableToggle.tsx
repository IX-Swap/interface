import React from 'react'
import { ButtonError } from 'app/components/ButtonError'
import { DialogEnabledToggle } from 'app/pages/admin/components/DialogEnabledToggle'
import { useUserActionsDialog } from 'app/pages/admin/hooks/useUserActionsDialog'
import { ButtonTransparent } from 'app/components/ButtonTransparent'

export interface ActionEnableToggleProps {
  enabled: boolean
}

export const ActionEnableToggle = ({ enabled }: ActionEnableToggleProps) => {
  const { enabledToggleOpen, closeEnabledToggle, openEnabledToggle } =
    useUserActionsDialog()

  return (
    <>
      {enabled ? (
        <ButtonError
          onClick={openEnabledToggle}
          variant='contained'
          disableElevation
        >
          DISABLE THIS USER
        </ButtonError>
      ) : (
        <ButtonTransparent
          onClick={openEnabledToggle}
          variant='contained'
          disableElevation
          color='primary'
        >
          ENABLE THIS USER
        </ButtonTransparent>
      )}
      <DialogEnabledToggle
        enabled={enabled}
        closeDialog={closeEnabledToggle}
        open={enabledToggleOpen}
      />
    </>
  )
}
