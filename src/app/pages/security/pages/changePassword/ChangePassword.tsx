import { Box, Grid, Paper } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { ChangePasswordFields } from 'app/pages/security/pages/changePassword/components/ChangePasswordFields'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { useChangePassword } from './hooks/useChangePassword'
import { ChangePasswordFormValues } from './types'
import { changePasswordFormValuesSchema } from './validation'

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
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader styled={false} title='Change Password' />
      </Grid>
      <RootContainer>
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
      </RootContainer>
    </Grid>
  )
}
