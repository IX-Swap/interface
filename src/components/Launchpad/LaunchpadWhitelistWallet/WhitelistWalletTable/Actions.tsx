import { IconButton } from 'components/LaunchpadMisc/styled'
import { ActionButtons } from 'pages/NFTCollection/styled'
import { X as DeleteIcon } from 'react-feather'
import React from 'react'
import { useTheme } from 'styled-components'

export interface ActionsProps {
  onAction: () => void
}
export const Actions = ({ onAction }: ActionsProps) => {
  const theme = useTheme()
  return (
    <ActionButtons>
      <IconButton onClick={onAction}>
        <DeleteIcon color={theme.launchpad.colors.error} size={20} />
      </IconButton>
    </ActionButtons>
  )
}
