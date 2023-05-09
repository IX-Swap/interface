import React from 'react'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import {
  newTenantSchema,
  tenantValidationSchema,
  initialTenantFormValues,
  TenantFormValues
} from 'types/tenants'
import { TenantFormFields } from './TenantFormFields'
import { SaveTenantButton } from './SaveTenantButton'

export const TenantForm = ({
  tenant
}: {
  tenant?: TenantFormValues | undefined
}) => {
  const { isTablet } = useAppBreakpoints()

  const isNewTenant = tenant === undefined
  const defaultValues = isNewTenant ? initialTenantFormValues : tenant
  const validationSchema = isNewTenant
    ? newTenantSchema
    : tenantValidationSchema

  return (
    <Form
      data-testid='tenant-form'
      defaultValues={defaultValues}
      validationSchema={validationSchema}
      allowInvalid
      id={`tenantForm`}
    >
      <Grid container direction={isTablet ? 'column-reverse' : 'row'}>
        <Grid item xs={9}>
          <TenantFormFields tenant={tenant} />
          <Grid item container justifyContent={'flex-end'}>
            <Grid item sx={{ marginTop: '15px' }}>
              <SaveTenantButton tenant={tenant} schema={validationSchema} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  )
}
