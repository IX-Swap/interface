//
import React, { useState } from 'react'
import {
  Paper,
  Container,
  Grid,
  Box,
  TextField,
  FormControl
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { snackbarService, ButtonWithLoading } from 'uno-material-ui'
import { red } from '@material-ui/core/colors'
import { useForm } from 'react-hook-form'
import PageTitle from 'components/PageTitle'
import Alert from '@material-ui/lab/Alert'
import { requestChangePassword } from './modules/actions'

const useStyles = makeStyles(theme => ({
  formContainer: {
    padding: '3em 2em'
  },
  textField: {
    margin: '1.25em 2em'
  },
  inlineError: {
    fontSize: '0.75em',
    color: red[500],
    marginLeft: '2.5em',
    lineHeight: 0
  },
  alert: {
    marginBottom: '1em'
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    fontWeight: 'bold',
    width: '100px',
    padding: '0.5em'
  }
}))

const ChangePassword = () => {
  const classes = useStyles()
  const { register, handleSubmit, errors, reset } = useForm()
  const [saving, setSaving] = useState(null)
  const [error, setError] = useState('')

  const onSubmit = async data => {
    const { oldPassword, newPassword, confirmNewPassword } = data

    if (newPassword !== confirmNewPassword) {
      setError('Password do not match!')
    } else {
      setSaving(true)

      const { error } = await requestChangePassword({
        oldPassword,
        newPassword
      })

      if (error) {
        setError(error)
      } else {
        snackbarService.showSnackbar(
          'Password changed successfully!',
          'success'
        )
        setError('')
        reset()
      }

      setSaving(false)
    }
  }

  const InlineError = ({ message }) => (
    <span className={classes.inlineError}>{message}</span>
  )

  return (
    <Container>
      <PageTitle title='Change Password' subPage />
      <Grid container alignItems='center' justify='center'>
        <Box width='450px' mt={12}>
          {error && (
            <Alert className={classes.alert} severity='error'>
              {error}
            </Alert>
          )}
          <Paper>
            <div onSubmit={handleSubmit(onSubmit)}>
              <Container className={classes.formContainer}>
                <FormControl fullWidth>
                  <TextField
                    name='oldPassword'
                    placeholder='Old Password'
                    className={classes.textField}
                    inputRef={register({ required: true })}
                    type='password'
                  />
                  {errors.oldPassword && (
                    <InlineError message='Field required.' />
                  )}
                  <TextField
                    name='newPassword'
                    placeholder='New Password'
                    className={classes.textField}
                    inputRef={register({ required: true })}
                    type='password'
                  />
                  {errors.newPassword && (
                    <InlineError message='Field required.' />
                  )}
                  <TextField
                    name='confirmNewPassword'
                    placeholder='Confirm New Password'
                    className={classes.textField}
                    inputRef={register({ required: true })}
                    type='password'
                  />
                  {errors.confirmNewPassword && (
                    <InlineError message='Field required.' />
                  )}
                </FormControl>
              </Container>
              <Box pb={3}>
                <Grid container justify='center'>
                  <Grid item>
                    <ButtonWithLoading
                      isFetching={saving}
                      disableElevation
                      type='submit'
                      className={classes.button}
                    >
                      Save
                    </ButtonWithLoading>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </Paper>
        </Box>
      </Grid>
    </Container>
  )
}

export default ChangePassword
