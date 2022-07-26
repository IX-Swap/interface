import React, { PropsWithChildren } from 'react'
import { CommitmentFormValues } from 'types/commitment'
import { FormProps, Form } from 'components/form/Form'
import { useMakeCommitment } from 'app/pages/invest/hooks/useMakeCommitment'
import { commitmentCampaignValidationSchema } from 'app/pages/invest/validation'
import { Grid, Paper } from '@mui/material'
import { MakeCommitmentFormFields } from 'app/pages/invest/components/MakeCommitment/MakeCommitmentFormFields'
import { DigitalSecurityOffering } from 'types/dso'
import { FormActions } from 'app/pages/invest/components/MakeCommitment/FormActions'

export interface MakeCommitmentFormProps {
  dso: DigitalSecurityOffering
}

export const MakeCommitmentForm = (
  props: PropsWithChildren<
    MakeCommitmentFormProps & FormProps<CommitmentFormValues>
  >
) => {
  const { dso, ...rest } = props

  const {
    invest: [makeInvestment]
  } = useMakeCommitment()
  const handleSubmit = async ({
    totalAmount,
    pricePerUnit,
    withdrawalAddress,
    ...values
  }: CommitmentFormValues) => {
    await makeInvestment({
      ...values,
      withdrawalAddress:
        withdrawalAddress === '' ? undefined : withdrawalAddress,
      signedSubscriptionDocument: values.signedSubscriptionDocument?._id,
      dso: dso._id,
      currency: dso.currency._id
    })
  }

  return (
    <Form
      {...rest}
      onSubmit={handleSubmit}
      validationSchema={commitmentCampaignValidationSchema}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <MakeCommitmentFormFields dso={dso} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <FormActions />
        </Grid>
      </Grid>
    </Form>
  )
}
