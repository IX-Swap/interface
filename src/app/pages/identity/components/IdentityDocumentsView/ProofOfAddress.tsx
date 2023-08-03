import React from 'react'
import { Grid } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { IdentityType } from 'app/pages/identity/utils/shared'
import { Documents } from 'app/pages/identity/components/CorporateIdentityView/Documents'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'

export interface DocumentsViewProps {
  data: DataroomFile[]
  investorRole?: string
  type?: IdentityType
}

export const ProofOfAddress = (props: DocumentsViewProps) => {
  const { data: documents } = props

  const proofOfAddressDocs = documents.filter(
    doc => Object.values(doc).length > 0 && doc.type === 'Proof of Address'
  )

  return (
    <FieldContainer>
      <Grid item container direction={'column'} spacing={3}>
        <Grid item>
          <FormSectionHeader title='Proof of Address' />
        </Grid>
        <Grid item>
          <Documents documents={proofOfAddressDocs} />
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
