import React from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent
} from '@material-ui/core'
import { Bank } from 'v2/types/bank'
import { BankFormValues, BankArgs } from 'v2/app/pages/accounts/types'
import { bankFormValidationSchema } from 'v2/app/pages/accounts/validation'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { Dataroom } from '../../../../identity/components/dataroom/Dataroom'
import {
  getBankFormDefaultValues,
  transformBankFormValuesToArgs
} from '../utils'

export interface BankFormProps {
  submitButtonLabel: string
  onSubmit: (bank: BankArgs) => Promise<any>
  bank?: Bank
}

const useBankForm = createTypedForm<BankFormValues>()

export const BankForm: React.FC<BankFormProps> = props => {
  const { submitButtonLabel, onSubmit, bank } = props
  const { Form, TextField, AssetSelect, CountrySelect, Submit } = useBankForm()
  const { paths } = useBanksRouter()
  const handleSubmit = async (values: BankFormValues) => {
    await onSubmit(transformBankFormValuesToArgs(values))
  }

  return (
    <Form
      defaultValues={getBankFormDefaultValues(bank)}
      validationSchema={bankFormValidationSchema}
      onSubmit={handleSubmit}
    >
      <Card>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item container spacing={3}>
              <Grid item sm={12} md={12} lg={12}>
                <Typography variant='h5'>Account Info</Typography>
              </Grid>
              <Grid item sm={12} md={12} lg={6}>
                <TextField name='bankName' label='Bank Name' />
              </Grid>
              <Grid item sm={12} md={12} lg={6}>
                <TextField
                  name='accountHolderName'
                  label='Account Holder Name'
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item sm={12} md={12} lg={3}>
                <AssetSelect
                  name='asset'
                  label='Currency'
                  assetType='Currency'
                />
              </Grid>
              <Grid item sm={12} md={12} lg={6}>
                <TextField
                  name='bankAccountNumber'
                  label='Bank Account Number'
                />
              </Grid>
              <Grid item sm={12} md={12} lg={3}>
                <TextField name='swiftCode' label='Swift Code' />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item sm={12} md={12} lg={12}>
                <Typography variant='h5'>Bank Address</Typography>
              </Grid>
              <Grid item sm={12} md={12} lg={6}>
                <TextField name={['address', 'line1']} label='Line 1' />
              </Grid>
              <Grid item sm={12} md={12} lg={6}>
                <TextField name={['address', 'line2']} label='Line 2' />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item sm={12} md={12} lg={6}>
                <TextField name={['address', 'city']} label='City' />
              </Grid>

              <Grid item sm={12} md={12} lg={6}>
                <TextField name={['address', 'state']} label='State' />
              </Grid>

              <Grid item sm={12} md={12} lg={6}>
                <CountrySelect name={['address', 'country']} label='Country' />
              </Grid>
              <Grid item sm={12} md={12} lg={6}>
                <TextField
                  name={['address', 'postalCode']}
                  label='Postal Code'
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item sm={12} md={12} lg={12}>
                <Typography variant='h5'>Supporting Documents</Typography>
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <Dataroom
                  editable
                  name='supportingDocuments'
                  isEditing={true}
                  dataroomDocumentProps={{ setValueToNullOnDelete: false }}
                  dataroomAddDocumentProps={{
                    documentInfo: { type: 'Supporting Document' }
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Grid container>
        <Grid item sm={12} md={12} lg={12}>
          <Box m={3} display='flex' justifyContent='center'>
            <Button color='default'>
              <AppRouterLink to={paths.list}>Cancel</AppRouterLink>
            </Button>
            <Box marginX={1} />
            <Submit>{submitButtonLabel}</Submit>
          </Box>
        </Grid>
      </Grid>
    </Form>
  )
}
