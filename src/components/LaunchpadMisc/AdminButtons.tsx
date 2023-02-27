import React from 'react'
import { useTheme } from 'styled-components'
import { FilledButton, OutlineButton } from './buttons'
import { X as Delete, Check } from 'react-feather'

interface AdminButtonProps {
  onReject: () => void
  onUpdate: () => void
  onApprove: () => void
  disabled: boolean
}
export const AdminButtons = ({ disabled, onReject, onUpdate, onApprove }: AdminButtonProps) => {
  const theme = useTheme()
  return (
    <>
      <OutlineButton
        disabled={disabled}
        onClick={onReject}
        borderColor={theme.launchpad.colors.error}
        color={theme.launchpad.colors.error}
      >
        Reject
        <Delete color={theme.launchpad.colors.error} size="19" strokeWidth={2} />
      </OutlineButton>
      <OutlineButton disabled={disabled} onClick={onUpdate}>
        Update
      </OutlineButton>
      <FilledButton disabled={disabled} onClick={onApprove} background={theme.launchpad.colors.success}>
        Approve
        <Check color={theme.launchpad.colors.background} size="19" strokeWidth={2} />
      </FilledButton>
    </>
  )
}
