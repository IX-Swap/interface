import { Box, Grid, Typography } from '@mui/material'
import { OTPField } from 'components/form/OTPField'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { useAppTheme } from 'hooks/useAppTheme'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useStyles } from 'app/components/OTP.styles'

export const OTPInputField = ({ disabled }: { disabled: boolean }) => {
  const { control } = useFormContext()
  const { theme } = useAppTheme()
  const { otp } = useStyles()
  return (
    <Grid item>
      <TypedField
        control={control}
        customRenderer
        component={OTPField}
        name='otp'
        isInputNum={true}
        containerStyle={{ alignItems: 'flex-start' }}
        inputStyle={otp}
        label={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              flexWrap: 'nowrap',
              pt: 0.5
            }}
          >
            <Typography color={theme.palette.dialog.color}>OTP </Typography>
            <Typography color={theme.palette.text.secondary}>
              &nbsp;(code from your authenticator)
            </Typography>
          </Box>
        }
        variant='outlined'
        valueExtractor={plainValueExtractor}
        shouldAutoFocus
        isDisabled={disabled}
        placeholder='______'
      />
    </Grid>
  )
}
