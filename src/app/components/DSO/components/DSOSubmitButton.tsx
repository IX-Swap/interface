import React from 'react'
import { Button } from '@material-ui/core'
import { transformDSOToFormValues } from 'app/components/DSO/utils'
import { useSubmitDSO } from 'app/pages/issuance/hooks/useSubmitDSO'
import { transformDSOFormValuesToRequestArgs } from 'app/pages/issuance/utils'
import { getIdFromObj } from 'helpers/strings'
import { DigitalSecurityOffering } from 'types/dso'

export interface DSOSubmitButtonProps {
  dso: DigitalSecurityOffering | undefined
}

export const DSOSubmitButton = (props: DSOSubmitButtonProps) => {
  const { dso } = props
  const dsoId = getIdFromObj(dso)
  const [submitDSO, { isLoading }] = useSubmitDSO(dsoId)
  const formValues = transformDSOFormValuesToRequestArgs({
    ...transformDSOToFormValues(dso)
  })

  // TODO: fix payload
  // delete formValues.tokenName
  // delete formValues.tokenSymbol
  // delete formValues.issuerName

  const handleClick = async () => await submitDSO(formValues)

  return (
    <Button
      color='primary'
      variant='contained'
      disableElevation
      disabled={isLoading}
      onClick={handleClick}
    >
      Submit
    </Button>
  )
}
