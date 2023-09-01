import React from 'react'
import { Grid } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { IdentityType } from 'app/pages/identity/utils/shared'
import { Documents } from 'app/pages/identity/components/CorporateIdentityView/Documents'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { LabelledValue } from 'components/LabelledValue'

export interface DocumentsViewProps {
  data: DataroomFile[]
  investorRole?: string
  type?: IdentityType
}

export const ProofOfIdentity = (props: DocumentsViewProps) => {
  const { data: documents } = props

  const proofOfIdentityDocs = documents.filter(
    doc => Object.values(doc).length > 0 && doc.type === 'Proof of Identity'
  )

  let documentFields = <></>

  if (proofOfIdentityDocs.length > 0) {
    const metadata: any = proofOfIdentityDocs[0].title
      .split(',')
      .map((data: any) => data.trim())
    const title = (metadata?.[0] === 'NA' ? null : metadata[0]) ?? null
    const documentNumber = (metadata?.[3] === 'NA' ? null : metadata[3]) ?? null
    const issuance = (metadata?.[1] === 'NA' ? null : metadata[1]) ?? null
    const expiry = (metadata?.[2] === 'NA' ? null : metadata[2]) ?? null

    documentFields = (
      <>
        <Grid item container direction={'column'} spacing={5}>
          <Grid item xs>
            <LabelledValue isRedesigned value={title} label='Document Type' />
          </Grid>
          <Grid item container>
            <Grid item xs md={6}>
              <LabelledValue
                isRedesigned
                value={documentNumber}
                label='Document Number'
              />
            </Grid>
            <Grid item xs md={6}>
              <LabelledValue
                isRedesigned
                value={issuance}
                label='Document Issuance Date'
              />
            </Grid>
          </Grid>
          <Grid item>
            <LabelledValue
              isRedesigned
              value={expiry}
              label='Document Expiry Date'
            />
          </Grid>
        </Grid>
      </>
    )
  }

  return (
    <FieldContainer>
      <Grid item container direction={'column'} spacing={3}>
        <Grid item>
          <FormSectionHeader title='Proof of Identity' />
        </Grid>
        {documentFields}
        <Grid item>
          <Documents documents={proofOfIdentityDocs} />
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
