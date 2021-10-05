import { Button, Grid } from '@material-ui/core'
import { useTokenListing } from 'app/pages/authorizer/hooks/useTokenListing'
import { CustodySelect } from 'app/pages/authorizer/pages/TokenDeployment/CustodySelect'
import { Form } from 'components/form/Form'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import * as yup from 'yup'

export interface CustodyFormFieldsProps {
  isLoading: boolean
}

export const CustodyFormFields = ({ isLoading }: CustodyFormFieldsProps) => {
  const { control, watch } = useFormContext<any>()
  const custody = watch('custody', undefined)

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <TypedField
          control={control}
          component={CustodySelect}
          label='Select Custody'
          name='custody'
          variant='outlined'
          inputProps={{ 'data-testid': 'capital-structure' }}
        />
      </Grid>
      <Grid item xs={4}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disableElevation
          style={{ height: 40 }}
          disabled={custody === undefined || isLoading}
        >
          Apply
        </Button>
      </Grid>
    </Grid>
  )
}

export const custodyFormValidationSchema = yup.object().shape({
  custody: yup.string().required('This is a required field')
})

export const CustodyForm = () => {
  const [setCustody, { isLoading }] = useTokenListing()
  const handleSubmit = async (args: any) => {
    await setCustody(args)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationSchema={custodyFormValidationSchema}
    >
      <CustodyFormFields isLoading={isLoading} />
    </Form>
  )
}
