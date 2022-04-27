import React from 'react'
import { Container, Paper, Grid, Box } from '@mui/material'
import { ChangePasswordFormValues } from './types'
import { changePasswordFormValuesSchema } from './validation'
import { useChangePassword } from './hooks/useChangePassword'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'
import { ChangePasswordFields } from 'app/pages/security/pages/changePassword/components/ChangePasswordFields'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

const defaultValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
}

export const ChangePassword = () => {
  const [changePassword] = useChangePassword()
  const onSubmit = async (values: ChangePasswordFormValues) => {
    await changePassword(values)
  }

  return (
    <>
      <PageHeader title='Change Password' />
      <Container style={{ backgroundColor: 'transparent' }}>
        <Grid container alignItems='center' justifyContent='center'>
          <Grid container lg={4} item>
            <Form
              defaultValues={defaultValues}
              validationSchema={changePasswordFormValuesSchema}
              onSubmit={onSubmit}
            >
              <Paper elevation={1}>
                <Box p={3}>
                  <Grid container>
                    <ChangePasswordFields />
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
    </>
  )
}
