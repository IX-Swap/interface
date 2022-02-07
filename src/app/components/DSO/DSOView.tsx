import React, { Fragment } from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { DSOPreview } from 'app/components/DSO/DSOPreview/DSOPreview'
import { Grid } from '@mui/material'
import { DSOSidebar } from 'app/components/DSO/components/DSOSidebar'
import { DSOPreviewActions } from 'app/components/DSO/components/DSOPreviewActions'
import { DSOBaseFieldsView } from 'app/components/DSO/DSOPreview/DSOBaseFieldsView'

export interface DSOViewProps {
  data: DigitalSecurityOffering
  showAuthorizations?: boolean
  showSidebar?: boolean
}

export const DSOView = (props: DSOViewProps) => {
  const { data, showAuthorizations = false, showSidebar = false } = props

  useSetPageTitle(data.tokenName)

  return (
    <Fragment>
      <DSOBaseFieldsView dso={data} />
      <Grid container>
        <Grid item lg={showSidebar ? 9 : 12} container direction='column'>
          <DSOPreview data={data} showAuthorizations={showAuthorizations} />
        </Grid>

        {showSidebar && (
          <Grid item lg={3}>
            <DSOSidebar dso={data} footer={<DSOPreviewActions dso={data} />} />
          </Grid>
        )}
      </Grid>
    </Fragment>
  )
}
