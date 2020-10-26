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
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import {
  getBankFormDefaultValues,
  transformBankFormValuesToArgs
} from 'v2/app/pages/accounts/pages/banks/utils'
import { Form } from 'v2/components/form/Form'
import { Submit } from 'v2/components/form/Submit'
import { AddressFields } from 'v2/app/pages/identity/components/AddressFields'
import { BankFields } from 'v2/app/pages/accounts/pages/banks/components/BankFields'
import { BankDocuments } from 'v2/app/pages/accounts/pages/banks/components/BankDocuments'
import { VSpacer } from 'v2/components/VSpacer'

export interface BankFormProps {
  submitButtonLabel: string
  onSubmit: (bank: BankArgs) => Promise<any>
  bank?: Bank
}

export const BankForm: React.FC<BankFormProps> = props => {
  const { submitButtonLabel, onSubmit, bank } = props
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
      <Grid container direction='column'>
        <Card variant='outlined'>
          <CardContent>
            <Grid item container direction='column' spacing={3}>
              <Grid item xs={12}>
                <Typography variant='h5'>Account Info</Typography>
              </Grid>
              <Grid container item direction='column' spacing={3}>
                <BankFields />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid item>
          <VSpacer size='small' />
        </Grid>

        <Card variant='outlined'>
          <CardContent>
            <Grid item container direction='column' spacing={3}>
              <Grid item xs={12}>
                <Typography variant='h5'>Bank Address</Typography>
              </Grid>
              <Grid container item direction='column'>
                <AddressFields />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid item>
          <VSpacer size='small' />
        </Grid>

        <Card variant='outlined'>
          <CardContent>
            <Grid item container direction='column' spacing={3}>
              <Grid item xs={12}>
                <Typography variant='h5'>Supporting Documents</Typography>
              </Grid>
              <Grid item xs={12}>
                <BankDocuments />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid item>
          <VSpacer size='small' />
        </Grid>

        <Grid container item xs={12} justify='center'>
          <Button
            component={AppRouterLinkComponent}
            to={paths.list}
            color='default'
          >
            Cancel
          </Button>
          <Box marginX={1} />
          <Submit>{submitButtonLabel}</Submit>
        </Grid>
      </Grid>
    </Form>
  )
}
