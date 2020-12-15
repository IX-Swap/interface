import React from 'react'
import { Container, Typography, Box, Grid } from '@material-ui/core'
import { useEnable2fa } from '../hooks/useEnable2fa'
import { Enable2faFormValues } from '../types'
import { enable2faFormValuesSchema } from '../validation'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'
import { OTPField } from 'app/pages/security/pages/setup2fa/components/OTPField'

const defaultValues = {
  otp: ''
}

export const Step4Enable = () => {
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
            <OTPField />
            <Box my={4} width='100%' textAlign='center'>
              <Submit>Submit</Submit>
            </Box>
          </Form>
        </Box>
      </Grid>
    </Container>
  )
}
