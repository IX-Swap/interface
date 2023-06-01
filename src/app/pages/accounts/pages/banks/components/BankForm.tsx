import React from 'react'
import { Box, Grid, Typography, Button, Card, CardContent } from '@mui/material'
import { Bank } from 'types/bank'
import { BankFormValues } from 'app/pages/accounts/types'
import { bankFormValidationSchema } from 'app/pages/accounts/validation'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { getBankFormDefaultValues } from 'app/pages/accounts/pages/banks/utils'
import { Form } from 'components/form/Form'
import { BankFields } from 'app/pages/accounts/pages/banks/components/BankFields'
import { VSpacer } from 'components/VSpacer'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'
import { ValidSubmit } from 'components/form/ValidSubmit'

export interface BankFormProps {
  submitButtonLabel: string
  onSubmit: (bank: BankFormValues) => Promise<any>
  bank?: Bank
}

export const BankForm: React.FC<BankFormProps> = props => {
  const { submitButtonLabel, onSubmit, bank } = props
  const handleSubmit = async (values: BankFormValues) => {
    await onSubmit(values)
  }

  useSetPageTitle(bank?.bankName)

  return (
    <Form
      defaultValues={getBankFormDefaultValues(bank)}
      validationSchema={bankFormValidationSchema}
      onSubmit={handleSubmit}
    >
      <Grid container direction='column'>
        <Card variant='outlined' sx={{ padding: { xs: 3, md: 5 } }}>
          <CardContent>
            <Grid item container direction='column' spacing={3}>
              <Grid item xs={12}>
                <Typography variant='h5'>Account Information</Typography>
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

        <Card variant='outlined' sx={{ padding: { xs: 3, md: 5 } }}>
          <CardContent>
            <Grid item container direction='column' spacing={3}>
              <Grid item xs={12}>
                <Typography variant='h5'>Bank Address</Typography>
                <Typography variant='body2' color={'#778194'} mt={1}>
                  Full address required for recipient bank
                </Typography>
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

        <Grid container item xs={12} justifyContent='flex-end'>
          <Button
            variant={'outlined'}
            component={AppRouterLinkComponent}
            to={BanksRoute.list}
          >
            Cancel
          </Button>
          <Box marginX={1} />
          <ValidSubmit>{submitButtonLabel}</ValidSubmit>
        </Grid>
      </Grid>
    </Form>
  )
}
