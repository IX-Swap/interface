import { Typography, Link } from '@mui/material'
import { useCreateCustodianWallet } from 'app/pages/exchange/hooks/useCreateCustodianWallet'
import { AssigningDialog } from 'app/pages/invest/components/CreateCustodyWithdrawalAddressButton/AssigningDialog'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import React, { useState } from 'react'

export const CreateCustodyWithdrawalAddressButton = () => {
  const [open, setOpen] = useState(false)

  const closeDialog = () => {
    setOpen(false)
  }

  const openDialog = () => {
    setOpen(true)
  }

  const { user } = useAuth()
  const [createCustodianWallet] = useCreateCustodianWallet({
    userId: getIdFromObj(user),
    onSuccess: closeDialog,
    onError: closeDialog
  })

  const handleClick = async () => {
    openDialog()
    await createCustodianWallet()
  }

  return (
    <>
      <Link
        component='button'
        style={{ backgroundColor: 'transparent', textTransform: 'none' }}
        variant='body1'
        type='button'
        onClick={handleClick}
      >
        <Typography color='primary'>
          Create custody withdrawal address
        </Typography>
      </Link>
      <AssigningDialog open={open} />
    </>
  )
}
