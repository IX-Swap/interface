import { Grid } from '@material-ui/core'
import { Form } from 'components/form/Form'
import React from 'react'
import { DirectorsAndBeneficialOwnerFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerFields'

export const DirectorsAndBeneficialOwnerDetails = () => {
  return (
    // <Form
    //   defaultValues={{
    //     directors: [
    //       {
    //         fullName: '',
    //         designation: '',
    //         phoneNumnber: '',
    //         emailAddress: '',
    //         residentialAddresss: '',
    //         documents: {
    //           proofOfIdentity: [],
    //           proofOfAddress: []
    //         }
    //       }
    //     ],
    //     beneficialOwners: [
    //       {
    //         fullName: '',
    //         percentageShareholding: '',
    //         documents: {
    //           proofOfIdentity: [],
    //           proofOfAddress: []
    //         }
    //       }
    //     ]
    //   }}
    // >
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <DirectorsAndBeneficialOwnerFields name='directors' />
      </Grid>
      <Grid item>
        <DirectorsAndBeneficialOwnerFields name='beneficialOwners' />
      </Grid>
    </Grid>
    // </Form>
  )
}
