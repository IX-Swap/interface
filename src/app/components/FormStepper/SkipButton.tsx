import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Grid,
  Typography
} from '@mui/material'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { VSpacer } from 'components/VSpacer'
import { history } from 'config/history'
import React, { useState } from 'react'
import { MutationResultPair } from 'react-query'
import { DetailsOfIssuanceFormValues } from 'types/detailsOfIssuance'

export interface SkipButtonProps {
  mutation: MutationResultPair<any, any, any, any>
}

export const SkipButton = ({ mutation }: SkipButtonProps) => {
  const [save, { isLoading }] = mutation
  const [open, setOpen] = useState(false)

  const closeDialog = () => {
    setOpen(false)
  }

  const openDialog = () => {
    setOpen(true)
  }

  const skippedPayload: Partial<DetailsOfIssuanceFormValues> = {
    fullName: ' ',
    companyName: ' ',
    companyRegistrationNumber: ' ',
    contactNumber: ' ',
    email: ' ',
    industry: ' ',
    fundRaisingAmount: 0,
    detail: ' ',
    companyRelated: undefined,
    issuanceRelated: undefined,
    financial: undefined,
    skipped: true
  }

  const handleSkip = async () => {
    await save(skippedPayload).then(() => {
      closeDialog()
      history.push(IdentityRoute.createIssuer)
    })
  }

  const handleClick = async () => {
    openDialog()
  }

  return (
    <>
      <Button
        variant='outlined'
        color='primary'
        disableElevation
        onClick={handleClick}
        disabled={isLoading}
      >
        SKIP THIS
      </Button>
      <Dialog open={open}>
        <Box p={4}>
          <Typography variant='subtitle1' align='center'>
            Are You Sure You Want To Skip This?
          </Typography>
          <VSpacer size='medium' />
          <DialogActions>
            <Grid container spacing={2} justifyContent='center'>
              <Grid item>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={closeDialog}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'
                  disableElevation
                  onClick={handleSkip}
                  disabled={isLoading}
                >
                  Yes
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}
