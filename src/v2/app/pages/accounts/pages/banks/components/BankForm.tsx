import React from 'react'
import { Box, Grid, Typography, Paper, Button } from '@material-ui/core'
import { Bank } from 'v2/types/bank'
import { BankFormValues } from 'v2/app/pages/accounts/types'
import { bankFormValidationSchema } from 'v2/app/pages/accounts/validation'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { Dataroom } from '../../../../identity/components/dataroom/Dataroom'
import {
  getBankFormDefaultValues,
  transformBankFormValuesToArgs
} from '../utils'
import { BankArgs } from '../service/types'

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
      <Paper elevation={0}>
        <Grid container>
          <Grid item sm={12} md={12} lg={12}>
            <Box ml={3} mt={3}>
              <Typography variant='h5'>Account Info</Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={12} lg={6}>
            <Box ml={3} m={1}>
              <TextField name='bankName' label='Bank Name' />
            </Box>
          </Grid>
          <Grid item sm={12} md={12} lg={6}>
            <Box mr={3} m={1}>
              <TextField name='accountHolderName' label='Account Holder Name' />
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item sm={12} md={12} lg={3}>
            <Box ml={3} m={1}>
              <AssetSelect name='asset' label='Currency' assetType='Currency' />
            </Box>
          </Grid>
          <Grid item sm={12} md={12} lg={6}>
            <Box ml={3} m={1}>
              <TextField name='bankAccountNumber' label='Bank Account Number' />
            </Box>
          </Grid>
          <Grid item sm={12} md={12} lg={3}>
            <Box mr={3} m={1}>
              <TextField name='swiftCode' label='Swift Code' />
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item sm={12} md={12} lg={12}>
            <Box ml={3} mt={3}>
              <Typography variant='h5'>Bank Address</Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={12} lg={6}>
            <Box ml={3} m={1}>
              <TextField name={['address', 'line1']} label='Line 1' />
            </Box>
          </Grid>
          <Grid item sm={12} md={12} lg={6}>
            <Box mr={3} m={1}>
              <TextField name={['address', 'line2']} label='Line 2' />
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item sm={12} md={12} lg={6}>
            <Box ml={3} m={1}>
              <TextField name={['address', 'city']} label='City' />
            </Box>
          </Grid>
          <Grid item sm={12} md={12} lg={6}>
            <Box mr={3} m={1}>
              <TextField name={['address', 'state']} label='State' />
            </Box>
          </Grid>
          <Grid container>
            <Grid item sm={12} md={12} lg={6}>
              <Box ml={3} m={1}>
                <CountrySelect name={['address', 'country']} label='Country' />
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <Box mr={3} m={1}>
                <TextField
                  name={['address', 'postalCode']}
                  label='Postal Code'
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item sm={12} md={12} lg={12}>
              <Box ml={3} mt={3}>
                <Typography variant='h5'>Supporting Documents</Typography>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <Box ml={3} mt={3}>
                <Dataroom
                  editable
                  name='supportingDocuments'
                  isEditing={true}
                  dataroomDocumentProps={{ setValueToNullOnDelete: false }}
                  dataroomAddDocumentProps={{
                    documentInfo: { type: 'Supporting Document' }
                  }}
                />
              </Box>
            </Grid>
          </Grid>

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
        </Grid>
      </Paper>
    </Form>
  )
}
