import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { DSOPreview } from 'app/components/DSO/DSOPreview/DSOPreview'
import { Grid } from '@material-ui/core'
import { DSOSidebar } from 'app/components/DSO/components/DSOSidebar'
import { DSOPreviewActions } from 'app/components/DSO/components/DSOPreviewActions'
import { useParams } from 'react-router-dom'

export const PreviewDSO = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
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
