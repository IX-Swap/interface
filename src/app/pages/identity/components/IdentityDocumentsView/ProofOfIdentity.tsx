import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { IdentityType } from 'app/pages/identity/utils/shared'
import { Documents } from 'app/pages/identity/components/CorporateIdentityView/Documents'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { LabelledValue } from 'components/LabelledValue'
import { ImagePreview } from 'components/ImagePreview'
import { ReactComponent as AvatarPhoto } from 'assets/icons/new/avatar_identity.svg'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export interface DocumentsViewProps {
  data: DataroomFile[]
  investorRole?: string
  type?: IdentityType
}

export const ProofOfIdentity = (props: DocumentsViewProps) => {
  const { isMobile } = useAppBreakpoints()
  const { data: documents } = props

  const proofOfIdentityDocs = documents.filter(
    doc => Object.values(doc).length > 0 && doc.type === 'Proof of Identity'
  )

  const selfie = documents.filter(
    doc => Object.values(doc).length > 0 && doc.type === 'Selfie'
  )

  return (
    <FieldContainer>
      <Grid item container direction={'column'} spacing={3}>
        <Grid item>
          <FormSectionHeader title='Proof of Identity' />
        </Grid>

        {proofOfIdentityDocs.map(doc => {
          const metadata: any = doc.title
            .split(',')
            .map((data: any) => data.trim())
          const title = (metadata?.[0] === 'NA' ? null : metadata[0]) ?? null
          const documentNumber =
            (metadata?.[3] === 'NA' ? null : metadata[3]) ?? null
          const issuance = (metadata?.[1] === 'NA' ? null : metadata[1]) ?? null
          const expiry = (metadata?.[2] === 'NA' ? null : metadata[2]) ?? null

          return (
            <>
              <Grid item container direction={'column'} spacing={5}>
                <Grid item xs>
                  <LabelledValue
                    isRedesigned
                    value={title}
                    label='Document Type'
                  />
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
        })}

        <Grid
          item
          display={'flex'}
          gap={3}
          sx={{ flexDirection: { xs: 'column', lg: 'row' } }}
        >
          {proofOfIdentityDocs.map(doc => {
            const idsWithFrontAndBack = ['NATIONAL ID', 'DRIVING LICENSE']
            const hasFrontAndBack = idsWithFrontAndBack.some(word =>
              doc.title.startsWith(word)
            )

            return !hasFrontAndBack ? (
              <Documents documents={proofOfIdentityDocs} />
            ) : (
              <ImagePreview
                fileName={doc.originalFileName}
                documentId={doc._id}
                ownerId={doc.user}
                size={[isMobile ? 'auto' : 390, 255]}
                borderRadius={8}
                fallback={<AvatarPhoto />}
              />
            )
          })}
        </Grid>

        <Grid item>
          <Typography my={2}>Selfie for Verification</Typography>
          <Grid item>
            {selfie.map(doc => {
              const isPdf = String(doc?.originalFileName).endsWith('.pdf')

              return isPdf ? (
                <Documents documents={selfie} />
              ) : (
                <ImagePreview
                  fileName={doc.originalFileName}
                  documentId={doc._id}
                  ownerId={doc.user}
                  size={[180, 255]}
                  borderRadius={8}
                  fallback={<AvatarPhoto />}
                />
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
