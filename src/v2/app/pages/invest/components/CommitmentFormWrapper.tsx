import React from 'react'
import { useDSOById } from 'v2/app/pages/invest/hooks/useDSOById'
import { Card, CardContent, Grid } from '@material-ui/core'
import { CommitmentFormFields } from 'v2/app/pages/invest/components/CommitmentFormFields'
import { CommitmentHeader } from 'v2/app/pages/invest/components/CommitmentHeader'
import { CommitmentForm } from 'v2/app/pages/invest/components/CommitmentForm'
import { VSpacer } from 'v2/components/VSpacer'
import { CommitmentFormSubmitButton } from 'v2/app/pages/invest/components/CommitmentFormSubmitButton'
import { CommitmentFormCancelButton } from 'v2/app/pages/invest/components/CommitmentFormCancelButton'
import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'
import { useCommitmentActivity } from '../hooks/useCommitmentActivity'
import { DownloadDSOSubscriptionDocument } from 'v2/app/components/DSO/components/DownloadDSOSubscriptionDocument'

export const CommitmentFormWrapper = () => {
  const { params } = useOfferingsRouter()
  const { data, isLoading } = useDSOById(params.dsoId, params.issuerId)

  useCommitmentActivity(data?._id)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <CommitmentForm
      dso={data._id}
      currency={data.currency._id}
      defaultValues={{ pricePerUnit: data.pricePerUnit }}
    >
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <CommitmentHeader dso={data} />
        </Grid>
        <Grid item container justify='center'>
          <Card style={{ width: 450 }} elevation={0}>
            <CardContent>
              <DownloadDSOSubscriptionDocument
                dsoId={data._id}
                variant='contained'
                color='primary'
                size='medium'
                fullWidth
              >
                Download Subscription Document
              </DownloadDSOSubscriptionDocument>
              <VSpacer size='small' />
              <CommitmentFormFields symbol={data.currency.symbol} />
              <VSpacer size='small' />
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <CommitmentFormCancelButton />
                </Grid>
                <Grid item xs={6}>
                  <CommitmentFormSubmitButton />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </CommitmentForm>
  )
}
