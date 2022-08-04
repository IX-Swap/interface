import React, { PropsWithChildren } from 'react'
import {
  CommitmentFormValues,
  SubmitCommitmentFormValues
} from 'types/commitment'
import { FormProps, Form } from 'components/form/Form'
import { useMakeCommitment } from 'app/pages/invest/hooks/useMakeCommitment'
import { commitmentCampaignValidationSchema } from 'app/pages/invest/validation'
import { Grid, Paper } from '@mui/material'
import { MakeCommitmentFormFields } from 'app/pages/invest/components/MakeCommitment/MakeCommitmentFormFields'
import { DigitalSecurityOffering } from 'types/dso'
import { FormActions } from 'app/pages/invest/components/MakeCommitment/FormActions'

export const capitalStructureWithFunds = [
  'Fund - Feeder/Sub-Fund',
  'Fund',
  'Fund - Standalone'
]

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
    invest: [makeInvestment],
    commit: [makeCommitment]
  } = useMakeCommitment()
  const handleSubmit = async ({
    totalAmount,
    pricePerUnit,
    withdrawalAddress,
    action,
    ...values
  }: SubmitCommitmentFormValues) => {
    const investCallback = action === 'commit' ? makeCommitment : makeInvestment
    await investCallback({
      ...values,
      withdrawalAddress:
        withdrawalAddress === '' ? undefined : withdrawalAddress,
      signedSubscriptionDocument: values.signedSubscriptionDocument?._id,
      dso: dso._id,
      currency: dso.currency._id
    })
  }
  const showCommit = capitalStructureWithFunds.includes(dso.capitalStructure)
  return (
    <Form {...rest} validationSchema={commitmentCampaignValidationSchema}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <MakeCommitmentFormFields dso={dso} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <FormActions onSubmit={handleSubmit} showCommit={showCommit} />
        </Grid>
      </Grid>
    </Form>
  )
}
