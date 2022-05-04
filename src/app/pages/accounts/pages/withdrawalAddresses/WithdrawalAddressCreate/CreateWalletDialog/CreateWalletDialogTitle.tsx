import React from 'react'
import { CenteredDialogTitle } from 'ui/CenteredDialogTitle'

export interface CreateWalletDialogTitleProps {
  label: string
  onButtonCloseClick: () => void
}
export const CreateWalletDialogTitle = ({
  label,
  onButtonCloseClick,
  ...rest
}: CreateWalletDialogTitleProps) => {
  return <CenteredDialogTitle {...rest}>{label}</CenteredDialogTitle>
}
