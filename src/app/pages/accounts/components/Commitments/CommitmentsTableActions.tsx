import { Button, Grid } from '@mui/material'
import { CommitmentInvestForm } from 'app/pages/accounts/components/Commitments/CommitmentInvestForm'
import { useConfirmCommitment } from 'app/pages/accounts/hooks/useConfirmCommitment'
import React, { useState } from 'react'
import { Commitment } from 'types/commitment'

export interface CommitmentsTableActionsProps {
  item: Commitment
}

export const CommitmentsTableActions = ({
  item
}: CommitmentsTableActionsProps) => {
  const [open, setOpen] = useState(false)

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  const [confirm, { isLoading }] = useConfirmCommitment(closeDialog)

  const handleSubmit = async (args: { otp: string }) => {
    await confirm({ commitmentId: item._id, otp: args.otp })
  }

  return (
    <>
      <Grid container>
        <Grid item>
          <Button
            variant='text'
            color='primary'
            onClick={openDialog}
            disabled={isLoading}
          >
            Invest
          </Button>
        </Grid>
      </Grid>
      <CommitmentInvestForm
        open={open}
        close={closeDialog}
        submit={handleSubmit}
      />
    </>
  )
}
