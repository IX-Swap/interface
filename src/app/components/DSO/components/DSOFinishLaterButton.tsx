import { Button } from '@material-ui/core'
import { useCreateDSO } from 'app/pages/issuance/hooks/useCreateDSO'
import { useUpdateDSO } from 'app/pages/issuance/hooks/useUpdateDSO'
import { getUpdateDSOPayload } from 'app/pages/issuance/utils'
import { getIdFromObj } from 'helpers/strings'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DigitalSecurityOffering, DSOFormValues } from 'types/dso'

export interface DSOFinishLaterButtonProps {
  dso: DigitalSecurityOffering | undefined
}

export const DSOFinishLaterButton = (props: DSOFinishLaterButtonProps) => {
  const { dso } = props
  const dsoId = getIdFromObj(dso)
  const { getValues } = useFormContext<DSOFormValues>()
  const [createDSO, { isLoading: isCreating }] = useCreateDSO()
  const [updateDSO, { isLoading: isUpdating }] = useUpdateDSO(
    dsoId,
    dso?.user ?? ''
  )

  const handleClick = async () => {
    const formValues = getUpdateDSOPayload({
      ...getValues(),
      status: 'Draft'
    })

    if (dso === undefined) {
      await createDSO(formValues)
    } else {
      await updateDSO(formValues)
    }
  }

  return (
    <Button
      variant='outlined'
      color='primary'
      onClick={handleClick}
      disabled={isCreating || isUpdating}
    >
      {dso === undefined ? 'Save draft' : 'Save'}
    </Button>
  )
}
