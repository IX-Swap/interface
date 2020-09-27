import React from 'react'
import { Container, Paper, Grid, Box } from '@material-ui/core'

import { PageTitle } from 'v2/app/components/PageTitle'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { ChangePasswordFormValues } from './types'
import { changePasswordFormValuesSchema } from './validation'
import { useChangePassword } from './hooks/useChangePassword'

const defaultValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
}

const useChangePasswordForm = createTypedForm<ChangePasswordFormValues>()

export const ChangePassword = () => {
  const { Form, TextField, Submit } = useChangePasswordForm()
  const [changePassword] = useChangePassword()
  const onSubmit = async (values: ChangePasswordFormValues) => {
    await changePassword(values)
  }

  return (
    <Container>
      <PageTitle title='Change Password' subPage={true} />
      <Grid container alignItems='center' justify='center'>
        <Grid container lg={4} item>
          <Form
            defaultValues={defaultValues}
            validationSchema={changePasswordFormValuesSchema}
            onSubmit={onSubmit}
          >
            <Paper elevation={1}>
              <Box p={3}>
                <Grid container>
                  <Grid item xs={12} md={12} lg={12}>
                    <Box mr={3} m={1}>
                      <TextField
                        name='oldPassword'
                        label='Old Password'
                        inputProps={{
                          type: 'password'
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Box mr={3} m={1}>
                      <TextField
                        name='newPassword'
                        label='New Password'
                        inputProps={{
                          type: 'password'
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Box mr={3} m={1}>
                      <TextField
                        name='confirmPassword'
                        label='Confirm New Password'
                        inputProps={{
                          type: 'password'
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Submit>Change</Submit>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Form>
        </Grid>
      </Grid>
    </Container>
  )
}
