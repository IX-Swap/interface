//
import React from 'react'
import { Paper, Box } from '@material-ui/core'

const BankDetails = ({ bank }) => (
  <Box m={4} style={{ width: '100%' }}>
    <Paper>
      <Box px={4} py={2}>
        <p>
          <b>{bank.bankName}</b>
        </p>
        <p>
          <b>Swift:</b>
          &nbsp;{bank.swiftCode}
        </p>
        <p>
          <b>Account:</b>
          &nbsp;{bank.accountHolderName}
        </p>
        <p>
          <b>Account Number:</b>
          &nbsp;{bank.bankAccountNumber}
        </p>
      </Box>
    </Paper>
  </Box>
)

export default BankDetails
