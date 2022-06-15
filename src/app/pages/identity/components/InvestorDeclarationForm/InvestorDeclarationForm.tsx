import React, { useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { DeclarationsListFields } from 'app/pages/identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsListFields'
import { OptInAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import { InvestorAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/InvestorAgreements'
import { useFormContext } from 'react-hook-form'
import { useServices } from 'hooks/useServices'
import { IdentityType } from 'app/pages/identity/utils/shared'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { CorporateDocuments } from 'app/pages/identity/components/InvestorDeclarationForm/CorporateDocuments/CorporateDocuments'
import { InstitutionalInvestorAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/InstitutionalInvestorAgreements/InstitutionalInvestorAgreements'
import { Divider } from 'ui/Divider'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { ValidateOnMount } from 'app/pages/identity/components/ValidateOnMount'

export interface InvestorDeclarationFormProps {
  identityType?: IdentityType
  corporateType?: 'investor' | 'issuer'
}

export const InvestorDeclarationForm = ({
  identityType = 'individual',
  corporateType = 'issuer'
}: InvestorDeclarationFormProps) => {
  const { snackbarService } = useServices()
  const { errors } = useFormContext()
  const declarationsError = errors.investorDeclarations
  const optInAgreementsError = errors.optInAgreements

  useEffect(() => {
    if (declarationsError !== undefined) {
      void snackbarService.showSnackbar(declarationsError.message, 'error')
    }
    if (optInAgreementsError !== undefined) {
      void snackbarService.showSnackbar(optInAgreementsError.message, 'error')
    }
  }, [declarationsError, optInAgreementsError]) // eslint-disable-line

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid
        item
        data-testid='investorStatusDeclaration'
        container
        spacing={2}
        direction={'column'}
      >
        <Grid item xs={12}>
          <FieldContainer>
            <Grid container spacing={3} direction={'column'}>
              <Grid item>
                <FormSectionHeader title='Investor Status Declaration' />
              </Grid>
              <Grid item>
                <InvestorAgreements type={identityType} />
              </Grid>
            </Grid>
          </FieldContainer>
        </Grid>

        <Grid item xs={12}>
          <FieldContainer>
            <Grid container direction={'column'} spacing={5}>
              <Grid item container spacing={3} direction={'column'}>
                <Grid item>
                  <FormSectionHeader title={'Opt-In Requirement'} />
                </Grid>
                <Grid item>
                  <DeclarationsListFields
                    title='I confirm to be treated as an “Accredited Investor” by InvestaX'
                    data={[
                      {
                        name: 'optInAgreements',
                        label: <OptInAgreements showOptOutDialog />
                      }
                    ]}
                  />
                </Grid>
              </Grid>
            </Grid>
          </FieldContainer>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <FieldContainer>
          <Grid item container direction={'column'}>
            <Grid item>
              <FormSectionHeader title='Institutional Investor Status Declaration' />
            </Grid>

            <Grid item>
              <DeclarationsListFields
                title=''
                data={[
                  {
                    name: 'isInstitutionalInvestor',
                    label: <InstitutionalInvestorAgreements />
                  }
                ]}
              />
            </Grid>

            <Grid item mt={3} mb={3}>
              <Divider />
            </Grid>

            <Grid item>
              <Grid item>
                <UploadDocumentField
                  name='institutionalInvestorDocuments'
                  label='Institutional Investor Documents'
                  helperElement={
                    <Typography
                      color={'text.secondary'}
                      mt={1.5}
                      fontWeight={400}
                    >
                      Institutional Investor Documents - License issued by
                      Regulator
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </FieldContainer>
      </Grid>

      {identityType !== 'individual' && (
        <CorporateDocuments corporateType={corporateType} />
      )}

      <ValidateOnMount />
    </Grid>
  )
}
