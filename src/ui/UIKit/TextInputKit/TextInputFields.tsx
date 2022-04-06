import { Grid } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'

export const TextInputFields = () => {
  const { control, setError } = useFormContext()
  useEffect(() => {
    setError('outlined3', {
      message: 'Account number 8 digits only'
    })
  }, [setError])
  return (
    <Grid container spacing={1} alignContent='center' xs={8}>
      <Grid container spacing={3} xs={6} direction='column'>
        <Grid item>
          <TypedField
            control={control}
            name='filled1'
            component={TextInput}
            customRenderer
            placeholder='Placeholder'
            label={'Label'}
            variant='filled'
          />
        </Grid>
        <Grid item>
          <TypedField
            control={control}
            name='filled2'
            variant='filled'
            placeholder='Placeholder'
            InputProps={{
              error: true
            }}
            helperText={'Validation message'}
            component={TextInput}
            customRenderer
          />
        </Grid>
        <Grid item>
          <TypedField
            control={control}
            name='filled3'
            component={TextInput}
            customRenderer
            disabled
            placeholder='Placeholder'
            label={'Label'}
            variant='filled'
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} xs={6} direction='column'>
        <Grid item>
          <TypedField
            control={control}
            name='outlined1'
            label={'Label'}
            placeholder='Placeholder'
            component={TextInput}
            customRenderer
            variant='outlined'
          />
        </Grid>
        <Grid item>
          <TypedField
            control={control}
            name='outlined2'
            label={'Label'}
            loading
            placeholder='Placeholder'
            component={TextInput}
            customRenderer
            variant='outlined'
          />
        </Grid>
        <Grid item>
          <TypedField
            name='outlined3'
            label={'Label'}
            variant='outlined'
            placeholder='Placeholder'
            InputProps={{
              error: true
            }}
            helperText={'Validation message'}
            control={control}
            component={TextInput}
            customRenderer
          />
        </Grid>
        <Grid item>
          <TypedField
            control={control}
            name='outlined4'
            label={'Label'}
            placeholder='Placeholder'
            disabled
            component={TextInput}
            customRenderer
            variant='outlined'
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
