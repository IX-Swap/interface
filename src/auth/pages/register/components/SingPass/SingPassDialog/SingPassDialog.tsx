import { Box, Dialog, DialogProps, IconButton } from '@mui/material'
import React from 'react'
import { SingPassNotice } from 'auth/pages/register/components/SingPass/SingPassDialog/SingPassNotice'
import { Icon } from 'ui/Icons/Icon'

export interface SingPassDialogProps extends DialogProps {
  handleClose: () => void
}

export const SingPassDialog = (props: SingPassDialogProps) => {
  return (
    <Dialog
      {...props}
      disablePortal
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(0,0,30,0.4)'
        }
      }}
      PaperProps={{
        sx: {
          bgcolor: '#FFF',
          width: '100%',
          maxWidth: 700,
          p: 0
        }
      }}
    >
      <Box position='relative' p={5}>
        <Box position='absolute' top={5} right={5}>
          <IconButton
            size='small'
            sx={{ height: 34 }}
            onClick={() => props.handleClose()}
          >
            <Icon name='close' />
          </IconButton>
        </Box>
        <SingPassNotice />
      </Box>
    </Dialog>
  )
}
