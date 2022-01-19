import React from 'react'
import { Box, Button } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOFinishLaterButton } from 'app/components/DSO/components/DSOFinishLaterButton'
import { useHistory, generatePath } from 'react-router-dom'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export interface DSOFormActionsProps {
  dso: DigitalSecurityOffering | undefined
}

export const DSOFormActions = (props: DSOFormActionsProps) => {
  const { dso } = props
  const { push } = useHistory()

  return (
    <>
      {dso !== undefined && (
        <Button
          data-testid='preview'
          variant={'contained'}
          color='primary'
          disableElevation
          onClick={() =>
            push(
              generatePath(IssuanceRoute.preview, {
                dsoId: dso?._id,
                issuerId: dso?.user
              })
            )
          }
        >
          Preview
        </Button>
      )}

      <Box mx={1} component='span' />

      <DSOFinishLaterButton dso={dso} />
    </>
  )
}
