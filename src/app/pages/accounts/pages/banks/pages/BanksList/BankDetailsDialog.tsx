import { Box, DialogTitle, Grid } from '@mui/material'
import { convertAddressToString } from 'app/pages/authorizer/components/utils'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'
import { Bank } from 'types/bank'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { useTheme } from '@mui/material/styles'

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
  const theme = useTheme()
  return (
    <UIDialog open={open} maxWidth='xs' fullWidth onClose={close}>
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
                  valueColor={theme.palette.dialog.color}
                  labelWeight='thin'
                  valueWeight='thin'
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  labelColor='gray'
                  label='Bank Account Number'
                  value={bank.bankAccountNumber}
                  valueColor={theme.palette.dialog.color}
                  labelWeight='thin'
                  valueWeight='thin'
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  labelColor='gray'
                  label='Swift Code'
                  value={bank.swiftCode}
                  valueColor={theme.palette.dialog.color}
                  labelWeight='thin'
                  valueWeight='thin'
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  labelColor='gray'
                  label='Currency'
                  value={bank.currency.symbol}
                  valueColor={theme.palette.dialog.color}
                  labelWeight='thin'
                  valueWeight='thin'
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  labelColor='gray'
                  label='Bank Address'
                  value={convertAddressToString(bank.address)}
                  valueColor={theme.palette.dialog.color}
                  labelWeight='thin'
                  valueWeight='thin'
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  labelColor='gray'
                  label={`Account Holder's Name`}
                  value={bank.accountHolderName}
                  valueColor={theme.palette.dialog.color}
                  labelWeight='thin'
                  valueWeight='thin'
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </UIDialog>
  )
}
