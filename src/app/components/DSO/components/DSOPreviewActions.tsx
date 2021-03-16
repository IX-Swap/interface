import React from 'react'
import { Box, Button } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOSubmitButton } from 'app/components/DSO/components/DSOSubmitButton'
import { useIssuanceRouter } from 'app/pages/issuance/router'

export interface DSOPreviewActionsProps {
  dso: DigitalSecurityOffering | undefined
}

export const DSOPreviewActions = (props: DSOPreviewActionsProps) => {
  const { dso } = props
  const { push } = useIssuanceRouter()

  return (
    <>
      <Button
        variant='outlined'
        color='primary'
        disableElevation
        onClick={() => push('edit', { dsoId: dso?._id, issuerId: dso?.user })}
      >
        Edit
      </Button>

      <Box mx={1} component='span' />

      <DSOSubmitButton dso={dso} />
    </>
  )
}
