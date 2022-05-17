import { Box, DialogTitle, Grid } from '@mui/material'
import { convertAddressToString } from 'app/pages/authorizer/components/utils'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'
import { Bank } from 'types/bank'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface BankDetailsDialogProps {
  bank: Bank
  open: boolean
  close: () => void
}

export const BankDetailsDialog = ({
  bank,
  open,
  close
}: BankDetailsDialogProps) => {
  return (
    <UIDialog open={open} maxWidth='sm' fullWidth onClose={close}>
      <Box position='relative'>
        <DialogTitle>Bank Account Information</DialogTitle>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={3} style={{ padding: '20px 40px 40px' }}>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  labelColor='gray'
                  label='Bank Name'
                  value={bank.bankName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  labelColor='gray'
                  label='Bank Account Number'
                  value={bank.bankAccountNumber}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  labelColor='gray'
                  label='Swift Code'
                  value={bank.swiftCode}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  labelColor='gray'
                  label='Currency'
                  value={bank.currency.symbol}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  labelColor='gray'
                  label='Bank Address'
                  value={convertAddressToString(bank.address)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  labelColor='gray'
                  label={`Account Holder's Name`}
                  value={bank.accountHolderName}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </UIDialog>
  )
}
