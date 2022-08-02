import { Box, Grid, Paper } from '@mui/material'
import { BackLink } from 'app/components/BackLink/BackLink'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { ChangePasswordFields } from 'app/pages/security/pages/changePassword/components/ChangePasswordFields'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { SecurityRoute } from '../../router/config'
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
  const { isTablet } = useAppBreakpoints()
  return (
    <Grid
      container
      direction='column'
      style={{ display: 'table' }}
      spacing={{ xs: 0, sm: 3 }}
    >
      <Grid item>
        <Box sx={{ pt: { xs: 1.5, md: 3 }, pb: { xs: 2, md: 4.5 } }}>
          <PageHeader
            styled={false}
            title='Change Password'
            alignment={isTablet ? 'flex-start' : 'center'}
            titleStyle={{ fontSize: isTablet ? 24 : 32 }}
            startComponent={
              <BackLink
                title='Back to settings'
                to={SecurityRoute.landing}
                hideTitleOnMobile
              />
            }
          />
        </Box>
      </Grid>
      <Grid container alignItems='center' justifyContent='center'>
        <Grid container sm={11} lg={6} item>
          <Form
            defaultValues={defaultValues}
            validationSchema={changePasswordFormValuesSchema}
            onSubmit={onSubmit}
          >
            <Paper>
              <Box p={{ xs: 3, md: 5 }}>
                <Grid container spacing={3}>
                  <ChangePasswordFields />
                  <Grid item xs={12} md={12} lg={12}>
                    <Submit fullWidth>Change</Submit>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Form>
        </Grid>
      </Grid>
    </Grid>
  )
}
