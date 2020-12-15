import React from 'react'
import { useUpdateDSO } from 'app/pages/issuance/hooks/useUpdateDSO'
import { DSOFormValues } from 'types/dso'
import { transformDSOFormValuesToRequestArgs } from 'app/pages/issuance/utils'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { DSOForm } from 'app/components/DSO/DSOForm'
import { DSOView } from 'app/components/DSO/DSOView'

export interface DSOProps {
  dsoId: string
  isEditing?: boolean
  showAuthorizations?: boolean
}

export const DSO: React.FC<DSOProps> = (props: DSOProps) => {
  const { dsoId, showAuthorizations = false, isEditing = false } = props
  const { isLoading, data } = useDSOById(dsoId)
  const [updateDSO] = useUpdateDSO(dsoId)
  const handleSubmit = async (values: DSOFormValues) => {
    await updateDSO(transformDSOFormValuesToRequestArgs(values, true))
  }

  if (isLoading || data === undefined) {
    return null
  }

  if (!isEditing) {
    return <DSOView data={data} showAuthorizations={showAuthorizations} />
  }

  return (
    <DSOForm data={data} onSubmit={handleSubmit} submitButtonLabel='Save' />
  )
}
