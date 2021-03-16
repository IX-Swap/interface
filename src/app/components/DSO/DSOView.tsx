import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { DSOPreview } from 'app/components/DSO/DSOPreview/DSOPreview'
import { Grid, Button } from '@material-ui/core'
import { DSOSidebar } from 'app/components/DSO/components/DSOSidebar'
import { IssuanceRoute } from 'app/pages/issuance/router'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { DSOSubmitButton } from 'app/components/DSO/components/DSOSubmitButton'
export interface DSOViewProps {
  data: DigitalSecurityOffering
  showAuthorizations?: boolean
  showSidebar?: boolean
}

export const DSOView = (props: DSOViewProps) => {
  const { data, showAuthorizations = false, showSidebar = false } = props

  useSetPageTitle(data.tokenName)

  return (
    <Grid container>
      <Grid item lg={showSidebar ? 9 : 12} container direction='column'>
        <DSOPreview data={data} showAuthorizations={showAuthorizations} />
      </Grid>

      {showSidebar && (
        <Grid item lg={3}>
          <DSOSidebar
            dso={data}
            footer={
              <>
                <Button
                  component={AppRouterLinkComponent}
                  color='primary'
                  variant='contained'
                  disableElevation
                  to={IssuanceRoute.edit}
                  params={{ dsoId: data._id }}
                >
                  Edit
                </Button>
                <DSOSubmitButton dso={data} />
              </>
            }
          />
        </Grid>
      )}
    </Grid>
  )
}
