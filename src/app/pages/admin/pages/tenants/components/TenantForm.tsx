import React from 'react'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { createDSOInformationSchema } from 'types/tenants'
import { TenantFormFields } from './TenantFormFields'

export const TenantForm = () => {
  const { isTablet } = useAppBreakpoints()
  //   const { control } = useFormContext<TenantFormValues>()
  //   console.log(control)

  return (
    <Form
      data-testid='tenant-form'
      defaultValues={{
        logoLight: 'undefined',
        logoDark: 'undefined',
        backgroundImage: 'undefined',
        companyName: 'undefined',
        tenantCode: 'undefined',
        url: 'undefined',
        email: 'undefined',
        description: 'undefined'
      }}
      validationSchema={createDSOInformationSchema}
      //   onSubmit={submitHandler}
      allowInvalid
      id={`tenantForm`}
      //   errors={stepValues[index]?.errors}
    >
      <Grid container direction={isTablet ? 'column-reverse' : 'row'}>
        <Grid item xs={9}>
          <TenantFormFields />
        </Grid>
      </Grid>
    </Form>
  )
}
