import { Button, Grid } from '@material-ui/core'
import { CommitmentInvestForm } from 'app/pages/accounts/components/Commitments/CommitmentInvestForm'
import { useMakeCommitment } from 'app/pages/invest/hooks/useMakeCommitment'
import React, { useState } from 'react'
import { Commitment } from 'types/commitment'

export interface CommitmentsTableActionsProps {
  item: Commitment
}

export const CommitmentsTableActions = ({
  item
}: CommitmentsTableActionsProps) => {
  const [open, setOpen] = useState(false)
  const {
    invest: [makeInvestment, { isLoading }]
  } = useMakeCommitment()
  const closeDialog = () => {
    setOpen(false)
  }

  const openDialog = () => {
    setOpen(true)
  }

  const handleSubmit = async (args: { otp: string }) => {
    console.log({ args })
    console.log({ item })
    await makeInvestment()
    closeDialog()
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
