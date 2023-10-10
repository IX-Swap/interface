import React from 'react'
import { Grid, Typography } from '@mui/material'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { ProofOfIdentityField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/ProofOfIdentityField'
import { EvidenceOfAccreditationHelper } from 'app/pages/identity/components/UploadDocumentsForm/EvidenceOfAccreditationHelper'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { useStyles } from 'app/pages/identity/components/UploadDocumentsForm/styles'
import { InvestorRole } from '../../utils/shared'
import { SelfieField } from './UploadDocumentField/SelfieField'

export const IndividualAccreditationDocumentsForm = ({
  investorRole = 'accredited'
}: {
  investorRole: InvestorRole
}) => {
  const styles = useStyles()
  const isExpert = investorRole === 'expert'

  return (
    <Grid item xs={12}>
      <FieldContainer>
        <Grid container direction='column' spacing={3}>
          <Grid item>
            <FormSectionHeader title={'Accreditation Documents'} />
            <Typography className={styles.text} mt={2}>
              Please upload the following documents. All account statements and
              documents should be dated within 3 months.
            </Typography>
          </Grid>
          <Grid item>
            <UploadDocumentField
              name='evidenceOfAccreditation'
              label={`Evidence of ${!isExpert ? 'Accreditation' : 'Expertise'}`}
              helperElement={
                <EvidenceOfAccreditationHelper investorRole={investorRole} />
              }
            />
          </Grid>
          {/* Hidden upload field for documents in Individual KYC. This is to preserve their value in the `documents` field */}
          <Grid item hidden>
            {/* <UploadDocumentField
              name='proofOfIdentity'
              label='Proof of Identity'
            /> */}
            <ProofOfIdentityField
              name='proofOfIdentity'
              label='Proof of Identity'
            />
            <SelfieField name='selfie' label='Selfie' />
            <UploadDocumentField
              name='proofOfAddress'
              label='Proof of Address'
            />
          </Grid>
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
