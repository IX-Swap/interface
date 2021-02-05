import React from 'react'
import { useStyles } from 'app/components/OnboardingDialog/OnboardingDialog.styles'
import { Portal, Fade, Box } from '@material-ui/core'

export interface BackDropProps {
  opened: boolean
}

export const BackDrop = ({ opened }: BackDropProps) => {
  const { backDrop } = useStyles()

  return (
    <Portal>
      <Fade in={opened} mountOnEnter>
        <Box className={backDrop} />
      </Fade>
    </Portal>
  )
}
