import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container } from '@material-ui/core'
import { PageTitle } from 'v2/app/components/PageTitle'
import { useDSOById } from 'v2/app/pages/invest/hooks/useDSOById'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { useUpdateDSO } from 'v2/app/pages/issuance/hooks/useUpdateDSO'
import { DSOFormValues } from 'v2/types/dso'
import { transformDSOFormValuesToRequestArgs } from 'v2/app/pages/issuance/pages/CreateDSO'

export const EditDSO = () => {
  const { dsoId } = useParams<{
    dsoId: string
  }>()
  const { isLoading, data } = useDSOById(dsoId)
  const [updateDSO] = useUpdateDSO(dsoId)
  const handleSubmit = async (values: DSOFormValues) => {
    await updateDSO(transformDSOFormValuesToRequestArgs(values, true))
  }

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Container>
      <PageTitle title={data.tokenName} subPage />
      <Box mb={4} />
      <DSOForm
        data={data}
        onSubmit={handleSubmit}
        submitButtonLabel='Save'
        isEditing
      />
    </Container>
  )
}
