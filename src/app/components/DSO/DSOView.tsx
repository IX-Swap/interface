import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { DSOPreview } from 'app/components/DSO/DSOPreview/DSOPreview'
import { Grid } from '@material-ui/core'
import { DSOFormSidebar } from 'app/components/DSO/components/DSOFormSidebar'
export interface DSOViewProps {
  data: DigitalSecurityOffering
  showAuthorizations?: boolean
}

export const DSOView = (props: DSOViewProps) => {
  const { data, showAuthorizations = false } = props

  useSetPageTitle(data.tokenName)

  return (
    <Grid container>
      <Grid item lg={9} container direction='column'>
        <DSOPreview data={data} showAuthorizations={showAuthorizations} />
      </Grid>

      <Grid item lg={3}>
        <DSOFormSidebar
          dso={data}
          isNew={false}
          isPreviewMode={false}
          togglePreviewMode={() => {}}
          showActions={false}
        />
      </Grid>
    </Grid>
  )
}
