import { Dialog, DialogProps } from '@mui/material'
import React from 'react'
import { SingPassNotice } from 'auth/pages/register/components/SingPass/SingPassDialog/SingPassNotice'

export const SingPassDialog = (props: DialogProps) => {
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
          p: 5
        }
      }}
    >
      <SingPassNotice />
    </Dialog>
  )
}
