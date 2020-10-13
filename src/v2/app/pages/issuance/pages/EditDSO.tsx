import React from 'react'
import { useDSOById } from 'v2/app/pages/invest/hooks/useDSOById'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { useUpdateDSO } from 'v2/app/pages/issuance/hooks/useUpdateDSO'
import { DSOFormValues } from 'v2/types/dso'
import { transformDSOFormValuesToRequestArgs } from 'v2/app/pages/issuance/utils'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'v2/components/VSpacer'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'

export const EditDSO = () => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()
  const { isLoading, data } = useDSOById(dsoId)
  const [updateDSO] = useUpdateDSO(dsoId)
  const handleSubmit = async (values: DSOFormValues) => {
    await updateDSO(transformDSOFormValuesToRequestArgs(values, true))
  }

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container>
      <Grid item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <DSOForm
          data={data}
          onSubmit={handleSubmit}
          submitButtonLabel='Save'
          isEditing
        />
      </Grid>
    </Grid>
  )
}
