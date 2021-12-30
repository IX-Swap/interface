import React from 'react'
import { Button } from '@material-ui/core'
import { useSubmitDSO } from 'app/pages/issuance/hooks/useSubmitDSO'
import { getIdFromObj } from 'helpers/strings'
import { DigitalSecurityOffering } from 'types/dso'

export interface DSOSubmitButtonProps {
  dso: DigitalSecurityOffering | undefined
}

export const DSOSubmitButton = (props: DSOSubmitButtonProps) => {
  const { dso } = props
  const dsoId = getIdFromObj(dso)
  const [submitDSO, { isLoading }] = useSubmitDSO(dsoId)

  const handleClick = async () => await submitDSO()

  if (dso?.status === 'Submitted') {
    return null
  }

  return (
    <Button
      color='primary'
      variant='contained'
      disableElevation
      disabled={isLoading || dso?.status !== 'Draft'}
      onClick={handleClick}
    >
      Submit
    </Button>
  )
}
