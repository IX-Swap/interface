import { SingPassButton } from 'auth/pages/register/components/SingPass/SingPassButton'
import { SingPassDialog } from 'auth/pages/register/components/SingPass/SingPassDialog/SingPassDialog'
import { hasValue } from 'helpers/forms'
import React, { useState } from 'react'

export const SingPass = () => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  if (
    !hasValue(process.env.SING_PASS_AUTH_URL) ||
    !hasValue(process.env.SING_PASS_CLIENT_ID) ||
    !hasValue(process.env.SING_PASS_REDIRECT_URL)
  ) {
    return null
  }

  return (
    <>
      <SingPassButton onClick={handleClick} />
      <SingPassDialog
        open={open}
        onClose={handleClose}
        handleClose={handleClose}
      />
    </>
  )
}
