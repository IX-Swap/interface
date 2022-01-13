import { Box, Button } from '@material-ui/core'
import { DSOFinishLaterButton } from 'app/components/DSO/components/DSOFinishLaterButton'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { useSaveDSO } from 'app/pages/issuance/hooks/useSaveDSO'

import React from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { DSOFormActionsProps } from 'types/dso'

export const DSOFormActions = (props: DSOFormActionsProps) => {
  const { dso, schema } = props
  const { push } = useHistory()
  const { onSubmit, isLoading } = useSaveDSO({ dso, schema })
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

      <DSOFinishLaterButton
        dso={dso}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </>
  )
}
