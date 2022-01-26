import {
  Box,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  useTheme
} from '@mui/material'
import { convertAddressToString } from 'app/pages/authorizer/components/utils'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'
import { Bank } from 'types/bank'
import CloseIcon from '@mui/icons-material/Close'

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
    <Dialog open={open} maxWidth='sm' fullWidth onClose={close}>
      <Box position='relative'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DialogTitle
              style={{
                backgroundColor: theme.palette.primary.main,
                color: '#FFF',
                textAlign: 'center'
              }}
            >
              Bank Account Information
            </DialogTitle>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3} style={{ padding: '20px 40px 40px' }}>
              <Grid item xs={12} md={6}>
                <LabelledValue label='Bank Name' value={bank.bankName} />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  label='Bank Account Number'
                  value={bank.bankAccountNumber}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue label='Swift Code' value={bank.swiftCode} />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue label='Currency' value={bank.currency.symbol} />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  label='Bank Address'
                  value={convertAddressToString(bank.address)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LabelledValue
                  label={`Account Holder's Name`}
                  value={bank.accountHolderName}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <IconButton
          aria-label='close'
          onClick={close}
          style={{
            position: 'absolute',
            top: 5,
            right: 10
          }}
          size='large'
        >
          <CloseIcon style={{ color: '#FFF' }} />
        </IconButton>
      </Box>
    </Dialog>
  )
}
