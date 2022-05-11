import { SingPassButton } from 'auth/pages/register/components/SingPass/SingPassButton'
import { SingPassDialog } from 'auth/pages/register/components/SingPass/SingPassDialog/SingPassDialog'
import React, { useState } from 'react'

export const SingPass = () => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <SingPassButton onClick={handleClick} />
      <SingPassDialog open={open} onClose={handleClose} />
    </>
  )
}
