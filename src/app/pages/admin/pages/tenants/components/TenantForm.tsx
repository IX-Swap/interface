import React from 'react'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import {
  createTenantSchema,
  initialTenantFormValues,
  TenantFormValues
} from 'types/tenants'
import { TenantFormFields } from './TenantFormFields'
import { SaveTenantButton } from './SaveTenantButton'

export const TenantForm = ({
  tenant
}: {
  tenant: TenantFormValues | undefined
}) => {
  const { isTablet } = useAppBreakpoints()

  return (
    <Form
      data-testid='tenant-form'
      defaultValues={tenant === undefined ? initialTenantFormValues : tenant}
      validationSchema={createTenantSchema}
      allowInvalid
      id={`tenantForm`}
    >
      <Grid container direction={isTablet ? 'column-reverse' : 'row'}>
        <Grid item xs={9}>
          <TenantFormFields />
          <Grid item container justifyContent={'flex-end'}>
            <Grid item sx={{ marginTop: '15px' }}>
              <SaveTenantButton tenant={tenant} schema={createTenantSchema} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  )
}
