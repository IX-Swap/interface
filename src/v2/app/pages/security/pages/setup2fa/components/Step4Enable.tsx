//
import React from 'react'
import { Container, Typography, Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { createTypedForm } from 'v2/components/form/createTypedForm'
import { useEnable2fa } from '../hooks/useEnable2fa'
import { Enable2faFormValues } from '../types'
import { enable2faFormValuesSchema } from '../validation'

const useEnable2faForm = createTypedForm<Enable2faFormValues>()

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%'
  }
}))

const defaultValues = {
  otp: ''
}

export const Step4Enable = () => {
  const classes = useStyles()
  const { Form, TextField, Submit } = useEnable2faForm()
  const [enable2fa] = useEnable2fa()
  const onSubmit = async (values: Enable2faFormValues) => {
    await enable2fa(values)
  }

  return (
    <Container>
      <Typography align='center'>Enable your Google Authenticator</Typography>
      <Grid container justify='center'>
        <Box mt={4} width='30%'>
          <Form
            defaultValues={defaultValues}
            validationSchema={enable2faFormValuesSchema}
            onSubmit={onSubmit}
            data-testid='form'
          >
            <TextField
              label='OTP'
              name='otp'
              inputProps={{
                autoComplete: 'off',
                className: classes.textField
              }}
            />
            <Box my={4} width='100%' textAlign='center'>
              <Submit>Submit</Submit>
            </Box>
          </Form>
        </Box>
      </Grid>
    </Container>
  )
}
