import React from 'react'
import { Button } from '@mui/material'
import { useSaveTenant } from 'app/pages/admin/hooks/useSaveTenant'
import { TenantFormValues } from 'types/tenants'

export interface SaveTenantButtonProps {
  tenant: TenantFormValues | undefined
  schema: any
}

export const SaveTenantButton = (props: SaveTenantButtonProps) => {
  const { tenant, schema } = props
  const { onSubmit, isLoading } = useSaveTenant({ tenant, schema })

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={onSubmit}
      disabled={isLoading}
    >
      {tenant === undefined ? 'Create Tenant' : 'Save'}
    </Button>
  )
}
