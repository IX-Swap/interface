import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DeclarationsListFields } from 'app/pages/identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsListFields'

export const optOutRequirements = [
  {
    name: 'digitalSecurities',
    label: 'Trading in digital securities on the InvestaX private exchange'
  },
  {
    name: 'primaryOfferingServices',
    label: 'Use of Primary Offering Services for the purpose of fundraising'
  },
  {
    name: 'digitalSecuritiesIssuance',
    label: 'Issuance of Digital Securities by the Issuers'
  },
  {
    name: 'allServices',
    label: 'Any/all Services/Products offered by InvestaX'
  }
]

export const OptOutInfoContent = () => {
  return (
    <>
      <Grid container justifyContent='center' spacing={2}>
        <Grid item>
          <Typography>
            1. I/We (“Accredited Investor” or “AI”) wish to inform you that I/We
            would like to withdraw my/our consent to be treated as an Accredited
            Investor (as defined in section 4A of the Securities and Future Act,
            Chapter 289 of Singapore) by InvestaX
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            2. My/Our withdrawal of consent to be treated as an Accredited
            Investor by InvestaX is in respect of the following services (please
            tick the applicable boxes)
          </Typography>
        </Grid>
        <Grid item container>
          <DeclarationsListFields data={optOutRequirements} />
        </Grid>
        <Grid item>
          <Typography>
            3. I/We agree, understand and accept that this withdrawal of consent
            will be subject to a processing time of 30 business days from the
            date of receipt of this form by InvestaX. InvestaX will notify after
            my/our status has been updated as Non-Accredited Investor (“NAI”) in
            its records and I/we will be treated as an AI until InvestaX
            notifies me/us of the updated status as NAI (“Effective Date”)
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            4. From the Effective Date, I/we shall be treated as NAI by InvestaX
            for all or any of the services mentioned above. Any transactions
            executed by me/us or Services/Products availed by me/us prior to the
            Effective Date will not be affected by such withdrawal of consent.
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
