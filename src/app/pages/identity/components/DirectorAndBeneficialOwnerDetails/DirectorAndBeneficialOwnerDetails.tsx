import { Grid } from '@material-ui/core'
import { Directors } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/Directors'
import { Form } from 'components/form/Form'
import React from 'react'
import { BeneficialOwners } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/BeneficialOwners'

export const DirectorAndBeneficialOwnerDetails = () => {
  return (
    <Form
      defaultValues={{
        directors: [
          {
            fullName: '',
            designation: '',
            phoneNumnber: '',
            emailAddress: '',
            residentialAddresss: '',
            documents: {
              proofOfIdentity: [],
              proofOfAddress: []
            }
          }
        ],
        beneficialOwners: [
          {
            fullName: '',
            percentageShareholding: '',
            documents: {
              proofOfIdentity: [],
              proofOfAddress: []
            }
          }
        ]
      }}
    >
      <Grid container direction='column' spacing={6}>
        <Grid item>
          <Directors />
        </Grid>
        <Grid item>
          <BeneficialOwners />
        </Grid>
      </Grid>
    </Form>
  )
}
