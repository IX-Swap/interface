// @flow
import React, { useEffect } from 'react'
import { forOwn } from 'lodash'
import { useForm, FormContext } from 'react-hook-form'
import { Button, Grid } from '@material-ui/core'
import { snackbarService } from 'uno-material-ui'
import IdentitySection from '../../components/IdentitySection'
import IdentityField from '../../components/IdentityField'
import IdentityForm from '../../components/IdentityForm'
import AddressForm from '../../components/AddressForm'
import Dataroom from '../../components/Dataroom'
import Declaration from '../../components/Declaration'
import declarations from '../../data/declarations'
import type { Identity, Document } from '../../modules/types'
import documents from '../../data/documents'

const IndividualIdentityForm = ({
  identity,
  editMode,
  dataroom,
  handleCreateIdentity,
  useOwnEmail = true,
  onCancelEdit
}: {
  identity: Identity,
  editMode: boolean,
  useOwnEmail?: boolean,
  dataroom: Document[],
  handleCreateIdentity?: Function,
  onCancelEdit?: Function,
}) => {
  const methods = useForm()
  const { handleSubmit, errors } = methods

  const onSubmit = (data: any) => {
    const formattedDeclarations = []
    forOwn(data.declarations, (value, key) => {
      formattedDeclarations.push({ [key]: value })
    })

    if (handleCreateIdentity) {
      handleCreateIdentity({
        ...data,
        documents: dataroom,
        declarations: formattedDeclarations
      })
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length) {
      snackbarService.showSnackbar(
        'Make sure all fields are filled out and declarations are checked',
        'error'
      )
    }
  }, [errors])

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IdentitySection title='My Identity'>
          <IdentityForm
            identity={identity}
            useOwnEmail={useOwnEmail}
            editMode={editMode}
          />
        </IdentitySection>

        <IdentitySection title='Address'>
          <AddressForm editMode={editMode} address={identity.address} />
        </IdentitySection>

        <IdentitySection title='Financials'>
          <IdentityField
            editMode={editMode}
            name='occupation'
            label='Occupation'
            value={identity.occupation}
          />
          <IdentityField
            editMode={editMode}
            name='employer'
            label='Employer'
            value={identity.employer}
          />
          <IdentityField
            editMode={editMode}
            name='employmentStatus'
            label='Employment Status'
            value={identity.employmentStatus}
          />
          <IdentityField
            editMode={editMode}
            name='industryOfEmployment'
            label='Industry'
            value={identity.industryOfEmployment}
          />
          <IdentityField
            editMode={editMode}
            name='walletAddress'
            label='Digital Security Wallet Address'
            value={identity.walletAddress || ''}
          />
          <IdentityField
            editMode={editMode}
            name='annualIncome'
            label='Annual Income'
            value={identity.annualIncome}
          />
          <IdentityField
            editMode={editMode}
            name='houseHoldIncome'
            label='Household Income'
            value={identity.houseHoldIncome}
          />
          <IdentityField
            editMode={editMode}
            name='sourceOfWealth'
            label='Source of Income'
            value={identity.sourceOfWealth}
          />
          <IdentityField
            editMode={editMode}
            name='bankName'
            label='Bank Name'
            value={identity.bankName}
          />
          <IdentityField
            editMode={editMode}
            name='bankAccountName'
            label='Name of Bank Account'
            value={identity.bankAccountName}
          />
          <IdentityField
            editMode={editMode}
            name='bankAccountNumber'
            label='Bank Account Number'
            value={identity.bankAccountNumber}
          />
          <IdentityField
            editMode={editMode}
            name='toArrangeCustody'
            label='I would like InvestaX to arrange digital security custody'
            type='check'
            size={12}
            value={identity.toArrangeCustody}
          />
        </IdentitySection>

        <IdentitySection title='Documents'>
          <Dataroom documentsList={documents.individual} dataroom={dataroom} />
        </IdentitySection>

        <IdentitySection
          title='Declaration & Acknowledgement'
          subtitle='Confirmation'
        >
          <Declaration
            editMode={editMode}
            declarations={identity.declarations || declarations.individual}
          />
          {editMode && (
            <Grid container justify='flex-end' spacing={2}>
              {identity && (
                <Grid item>
                  <Button
                    type='button'
                    variant='contained'
                    color='default'
                    onClick={onCancelEdit}
                  >
                    Cancel
                  </Button>
                </Grid>
              )}

              <Grid item>
                <Button type='submit' variant='contained' color='primary'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          )}
        </IdentitySection>
      </form>
    </FormContext>
  )
}

export default IndividualIdentityForm
