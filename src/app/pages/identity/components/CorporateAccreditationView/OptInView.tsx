import { Grid } from '@mui/material'
import { DeclarationsList } from 'app/pages/identity/components/DeclarationsList/DeclarationsList'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { OptInAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import React from 'react'
import { capitalizeFirstLetter } from 'helpers/strings'

export interface OptInViewProps {
  data: IndividualIdentity | CorporateIdentity
}

export const OptInView: React.FC<OptInViewProps> = ({ data }) => {
  const {
    applyingAs,
    declarations: {
      investorsStatus: { optInAgreements }
    }
  } = data

  const optInRequirement = {
    optInAgreements: optInAgreements ?? false
  }

  const investorRole = capitalizeFirstLetter(
    applyingAs.length > 0 ? applyingAs[0] : 'accredited'
  )

  return (
    <FieldContainer>
      <Grid container direction={'column'} spacing={5}>
        <Grid item container spacing={3} direction={'column'}>
          <Grid item>
            <FormSectionHeader title='Opt-In Requirement' />
          </Grid>
          <Grid item>
            <DeclarationsList
              title={`I confirm to be treated as an “${investorRole} Investor” by InvestaX`}
              data={optInRequirement}
              labelMap={{
                optInAgreements: <OptInAgreements investorRole={investorRole} />
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
