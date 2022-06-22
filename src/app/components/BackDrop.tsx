import React from 'react'
import { useStyles } from 'app/components/UncompletedIdentityDialog/UncompletedIdentityDialog.styles'
import { Portal, Fade, Box } from '@mui/material'

export interface BackDropProps {
  opened: boolean
  onClick: () => void
}

export const BackDrop = ({ opened, onClick }: BackDropProps) => {
  const { backDrop } = useStyles()

  return (
    <Portal>
      <Fade in={opened} mountOnEnter>
        <Box className={backDrop} onClick={onClick} />
      </Fade>
    </Portal>
  )
}
