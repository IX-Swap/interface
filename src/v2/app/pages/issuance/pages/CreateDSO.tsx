import React from 'react'
import { Box, Container } from '@material-ui/core'
import { PageTitle } from 'v2/app/components/PageTitle'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { useCreateDSO } from 'v2/app/pages/issuance/hooks/useCreateDSO'
import { DSOFormValues, DSORequestArgs } from 'v2/types/dso'
import { wysiwygToHtml } from 'v2/components/form/RichTextEditor'

export const transformDSOFormValuesToRequestArgs = (
  values: DSOFormValues,
  isUpdating = false
): DSORequestArgs => {
  const dso = values

  delete dso.status

  if (isUpdating) {
    delete dso.tokenName
    delete dso.tokenSymbol
    delete dso.issuerName
  }

  return {
    ...dso,
    businessModel: wysiwygToHtml(dso.businessModel),
    introduction: wysiwygToHtml(dso.introduction),
    useOfProceeds: wysiwygToHtml(dso.useOfProceeds),
    fundraisingMilestone: wysiwygToHtml(dso.fundraisingMilestone),
    team:
      dso.team?.map(({ about, ...rest }) => ({
        ...rest,
        about: wysiwygToHtml(about)
      })) ?? [],
    documents: (dso.documents
      ?.map(d => d.document?._id ?? null)
      .filter(d => d !== null) ?? []) as string[]
  }
}

export const CreateDSO = () => {
  const [createDSO] = useCreateDSO()
  const handleSubmit = async (values: DSOFormValues) => {
    const args = transformDSOFormValuesToRequestArgs(values)

    await createDSO(args)
  }

  return (
    <Container>
      <PageTitle title='Create Dso' subPage />
      <Box mb={4} />
      <DSOForm
        submitButtonLabel='Create DSO'
        onSubmit={handleSubmit}
        isEditing
        isNew
      />
    </Container>
  )
}
