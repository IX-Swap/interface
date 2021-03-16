import React from 'react'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { DSOPreview } from 'app/components/DSO/DSOPreview/DSOPreview'
import { Grid } from '@material-ui/core'
import { DSOSidebar } from 'app/components/DSO/components/DSOSidebar'
import { DSOPreviewActions } from 'app/components/DSO/components/DSOPreviewActions'

export const PreviewDSO = () => {
  const {
    params: { dsoId, issuerId }
  } = useIssuanceRouter()

  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container>
      <Grid item lg={9} container direction='column'>
        <DSOPreview data={data} showAuthorizations />
      </Grid>

      <Grid item lg={3}>
        <DSOSidebar dso={data} footer={<DSOPreviewActions dso={data} />} />
      </Grid>
    </Grid>
  )
}
