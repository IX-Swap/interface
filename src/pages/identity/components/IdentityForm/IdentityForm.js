import React, { useEffect } from 'react'
import { Grid, Card, TextField, Typography, Box, Button, CircularProgress } from '@material-ui/core'
import { useIdentityState, useIdentityDispatch, getIdentity, saveIdentity } from 'context/IdentityContext'
import { useForm, Controller } from 'react-hook-form'

export default function IdentityForm () {
  const { status, handleSubmit, fields } = useIdentityFormLogic()

  return (
    <Card component='form' onSubmit={handleSubmit}>
      <Box p={3}>
        {['INIT', 'GETTING'].includes(status) ? (
          <Box p={3} display='flex' justifyContent='center'>
            <CircularProgress size={48} />
          </Box>
        ) : (
          <>
            <Typography component='h3' variant='h3'>My Identity</Typography>

            <Box component='section' mt={3}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <Controller as={TextField} fullWidth margin='dense' label='First Name' {...fields.firstName} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller as={TextField} fullWidth margin='dense' label='Middle Name' {...fields.middleName} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller as={TextField} fullWidth margin='dense' label='Last Name' {...fields.lastName} />
                </Grid>
              </Grid>
            </Box>

            <Box component='section' mt={4}>
              <Typography component='h3' variant='h6' gutterBottom={false}>Address</Typography>

              <Controller as={TextField} fullWidth margin='dense' label='Unit'  {...fields.unit}/>
              <Controller as={TextField} fullWidth margin='dense' label='Line 1' {...fields.line1} />
              <Controller as={TextField} fullWidth margin='dense' label='Line 2' {...fields.line2} />
            </Box>

            <Box mt={4}>

              <Controller as={TextField} fullWidth margin='dense' label='Contact Number' {...fields.contactNumber} />
              <Controller as={TextField} fullWidth margin='dense' label='Nationality'  {...fields.nationality}/>
            </Box>

            <Box display='flex' justifyContent='flex-end' mt={6}>
              <Button disabled={status !== 'IDLE'} type='submit' variant='contained' color='primary'>
                {status === 'SAVING'
                  ? 'Saving...'
                  : 'Save'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Card>
  )
}

// ############################################################

const useIdentityFormLogic = () => {
  const { status, shouldCreateNew, identity } = useIdentityState()
  const idDispatch = useIdentityDispatch()
  const methods = useForm()
  const { handleSubmit: rhfHandleSubmit, errors, control, setValue } = methods

  // load identity data to form when it updates from reducer
  const ADDRESS_KEYS = ['unit', 'line1', 'line2']
  useEffect(() => {
    const isLoadedDataEmpty = !identity || !Object.keys(identity).length
    if (isLoadedDataEmpty) return

    Object.keys(fields)
      .forEach(fieldName => {
        const isAddr = ADDRESS_KEYS.includes(fieldName)
        const loadedFieldValue = isAddr
          ? (identity.address && identity.address[fieldName])
          : identity[fieldName]
        if (!loadedFieldValue) return
        setValue(fieldName, loadedFieldValue)
      })
  }, [identity])

  // fetch identity data for initial values
  useEffect(() => {
    getIdentity(idDispatch)
  }, [])

  // saves identity data for on form submit
  const handleSubmit = rhfHandleSubmit(newIdentity => {
    saveIdentity(idDispatch, newIdentity, shouldCreateNew)
  })

  const createFieldsProps = (key, rules) =>
    ({
      name: key,
      error: errors[key] && errors[key].message,
      helperText: (errors[key] && errors[key].message) || '',
      defaultValue: '',
      rules,
      control,
    })

  const fields = {
    firstName: createFieldsProps('firstName', { pattern: { value: NAME_REGEX, message: 'Invalid name' } }),
    middleName: createFieldsProps('middleName', { pattern: { value: NAME_REGEX, message: 'Invalid name' } }),
    lastName: createFieldsProps('lastName', { pattern: { value: NAME_REGEX, message: 'Invalid name' } }),
    unit: createFieldsProps('unit'),
    line1: createFieldsProps('line1'),
    line2: createFieldsProps('line2'),
    contactNumber: createFieldsProps('contactNumber'),
    nationality: createFieldsProps('nationality', { pattern: { value: NAME_REGEX, message: 'Invalid nationality' } })
  }

  return { status, handleSubmit, fields, methods }
}

const NAME_REGEX = /^\s*([A-Za-z]{1,}([\.,] |[-']| )?)+[A-Za-z]+\.?\s*$/
