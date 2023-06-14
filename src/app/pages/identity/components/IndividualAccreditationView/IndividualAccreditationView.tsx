import React from 'react'
import { Grid } from '@mui/material'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { InvestorDeclarationView } from 'app/pages/identity/components/CorporateAccreditationView/InvestorDeclarationView'
import { FieldContainer } from '../../../../../ui/FieldContainer/FieldContainer'
import { FormSectionHeader } from '../../../../../ui/FormSectionHeader/FormSectionHeader'
import { IdentityDocumentsView } from '../IdentityDocumentsView/IdentityDocumentsView'
import { OptInRequirementView } from '../IndividualIdentityView/OptInRequirementView/OptInRequirementView'
import { Element } from 'react-scroll'

export enum IndividualAccreditationSections {
  'Investor Role Declaration' = 'investor-role-declaration',
  'Opt-In Requirement' = 'opt-in-requirement',
  'Personal Documents' = 'personal-documents'
}

export interface IndividualAccreditationViewProps {
  data: IndividualIdentity
  showReview?: boolean
}

export const IndividualAccreditationView = ({
  data
}: IndividualAccreditationViewProps) => {
  const { applyingAs } = data
  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <Element
          name={IndividualAccreditationSections['Investor Role Declaration']}
        >
          <InvestorDeclarationView isCorporate={false} data={data} />
        </Element>
      </Grid>

      <Grid item>
        <Element name={IndividualAccreditationSections['Opt-In Requirement']}>
          <OptInRequirementView data={data} />
        </Element>
      </Grid>

      <Grid item>
        <Element name={IndividualAccreditationSections['Personal Documents']}>
          <FieldContainer>
            <Grid item container direction={'column'} spacing={3}>
              <Grid item>
                <FormSectionHeader title='Personal Documents' />
              </Grid>
              <Grid item>
                <IdentityDocumentsView
                  data={data.documents}
                  type='individual'
                  investorRole={
                    typeof applyingAs !== 'undefined'
                      ? applyingAs[0]
                      : 'accredited'
                  }
                />
              </Grid>
            </Grid>
          </FieldContainer>
        </Element>
      </Grid>
    </Grid>
  )
}
