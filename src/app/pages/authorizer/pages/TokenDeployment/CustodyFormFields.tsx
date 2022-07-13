import { Button, Grid } from '@mui/material'
import { CustodySelect } from 'app/pages/authorizer/pages/TokenDeployment/CustodySelect'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface CustodyFormFieldsProps {
  isLoading: boolean
}

export const CustodyFormFields = ({ isLoading }: CustodyFormFieldsProps) => {
  const { control, watch } = useFormContext<any>()
  const custody = watch('custody', undefined)

  return (
    <Grid container spacing={3} alignItems='flex-end'>
      <Grid item xs={6} sm={5} md={4}>
        <TypedField
          control={control}
          component={CustodySelect}
          label='Select Custody'
          name='custody'
          variant='outlined'
          inputProps={{ 'data-testid': 'capital-structure' }}
        />
      </Grid>
      <Grid item xs={6} sm={5} md={4}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disableElevation
          style={{ height: 50 }}
          disabled={custody === undefined || isLoading}
        >
          Apply
        </Button>
      </Grid>
    </Grid>
  )
}
