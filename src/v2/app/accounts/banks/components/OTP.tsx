import { Box, Grid } from '@material-ui/core'
import React from 'react'
import { observer } from 'mobx-react'
import { TransactionWithOTP } from 'v2/app/accounts/types'
import { createTypedTextInput } from 'v2/components/form/typed/TextInput'

const TextInput = createTypedTextInput<TransactionWithOTP>()

export const OTP: React.FC = observer(() => {
  return (
    <Grid item container direction='column'>
      <Box my={4} alignSelf='center'>
        <TextInput name='otp' label='2-Factor Auth Code' autoComplete='off' />
      </Box>
    </Grid>
  )
})
