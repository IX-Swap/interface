import React from 'react'
import { Dialog, Box, Typography, Button } from '@material-ui/core'

export interface IdentityDialogProps {
  closeFn: () => void
  isOpen: boolean
}

export const IdentityDialog = ({ closeFn, isOpen }: IdentityDialogProps) => {
  return (
    <Dialog fullWidth open={isOpen} onClose={closeFn}>
      <Box mt={4} p={4}>
        <Typography align='left'>
          To access more features of the platform, please create an identity.
        </Typography>
        <Box pt={4}>
          <Button onClick={closeFn}>Skip for now</Button>
        </Box>
      </Box>
    </Dialog>
  )
}
