import React from 'react'
import { Box, Button } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOSubmitButton } from 'app/components/DSO/components/DSOSubmitButton'
import { useHistory, generatePath } from 'react-router-dom'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export interface DSOPreviewActionsProps {
  dso: DigitalSecurityOffering | undefined
}

export const DSOPreviewActions = (props: DSOPreviewActionsProps) => {
  const { dso } = props
  const { push } = useHistory()

  return (
    <>
      <Button
        variant='outlined'
        color='primary'
        disableElevation
        onClick={() =>
          push(
            generatePath(IssuanceRoute.edit, {
              dsoId: dso?._id,
              issuerId: dso?.user
            })
          )
        }
      >
        Edit
      </Button>

      <Box mx={1} component='span' />

      <DSOSubmitButton dso={dso} />
    </>
  )
}
