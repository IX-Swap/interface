import React from 'react'
import { Box, Grid, Typography, Paper, Button } from '@material-ui/core'
import { Bank } from 'v2/types/bank'
import { createTypedTextInput } from 'v2/components/form/typed/TextInput'
import { createTypedAssetSelect } from 'v2/components/form/typed/AssetSelect'
import { createTypedCountrySelect } from 'v2/components/form/typed/CountrySelect'
import { BankFormValues } from 'v2/app/accounts/types'
import { bankFormValidationSchema } from 'v2/app/accounts/validation'
import { useBanksRouter } from 'v2/app/accounts/banks/router'
import { Form } from 'v2/components/form/Form'
import { SubmitButton } from 'v2/components/form/SubmitButton'
import { AppRouterLink } from 'v2/components/AppRouterLink'

const TextInput = createTypedTextInput<BankFormValues>()
const AssetSelect = createTypedAssetSelect<BankFormValues>()
const CountrySelect = createTypedCountrySelect<BankFormValues>()

const formDefaultValues: BankFormValues = {
  bankName: '',
  bankAccountNumber: '',
  accountHolderName: '',
  asset: '',
  swiftCode: '',
  address: {
    line1: '',
    line2: '',
    country: '',
    state: '',
    city: '',
    postalCode: ''
  }
}

export interface BankFormProps {
  submitButtonLabel: string
  onSubmit: (bank: BankFormValues) => Promise<any>
  bank?: Bank
}

export const BankForm: React.FC<BankFormProps> = props => {
  const { submitButtonLabel, onSubmit, bank } = props
  const { routes } = useBanksRouter()

  return (
    <Form<BankFormValues>
      defaultValues={
        bank === undefined
          ? formDefaultValues
          : {
            ...bank,
            asset: bank.asset._id
          }
      }
      validationSchema={bankFormValidationSchema}
      onSubmit={async values => await onSubmit(values)}
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
              <TextInput name='bankName' label='Bank Name' />
            </Box>
          </Grid>
          <Grid item sm={12} md={12} lg={6}>
            <Box mr={3} m={1}>
              <TextInput name='accountHolderName' label='Account Holder Name' />
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item sm={12} md={12} lg={3}>
            <Box ml={3} m={1}>
              <AssetSelect name='asset' assetType='Currency' />
            </Box>
          </Grid>
          <Grid item sm={12} md={12} lg={6}>
            <Box ml={3} m={1}>
              <TextInput name='bankAccountNumber' label='Bank Account Number' />
            </Box>
          </Grid>
          <Grid item sm={12} md={12} lg={3}>
            <Box mr={3} m={1}>
              <TextInput name='swiftCode' label='Swift Code' />
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
              <TextInput name={['address', 'line1']} label='Line 1' />
            </Box>
          </Grid>
          <Grid item sm={12} md={12} lg={6}>
            <Box mr={3} m={1}>
              <TextInput name={['address', 'line2']} label='Line 2' />
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item sm={12} md={12} lg={6}>
            <Box ml={3} m={1}>
              <TextInput name={['address', 'city']} label='City' />
            </Box>
          </Grid>
          <Grid item sm={12} md={12} lg={6}>
            <Box mr={3} m={1}>
              <TextInput name={['address', 'state']} label='State' />
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
                <TextInput
                  name={['address', 'postalCode']}
                  label='Postal Code'
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item sm={12} md={12} lg={12}>
              <Box m={3} display='flex' justifyContent='center'>
                <Button color='default'>
                  <AppRouterLink to={routes.list}>Cancel</AppRouterLink>
                </Button>
                <Box marginX={1} />
                <SubmitButton>{submitButtonLabel}</SubmitButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Form>
  )
}
