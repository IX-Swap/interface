import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { Card, CardContent, Grid } from '@material-ui/core'
import { CommitmentFormFields } from 'app/pages/invest/components/CommitmentFormFields'
import { CommitmentHeader } from 'app/pages/invest/components/CommitmentHeader'
import { CommitmentForm } from 'app/pages/invest/components/CommitmentForm'
import { VSpacer } from 'components/VSpacer'
import { CommitmentFormSubmitButton } from 'app/pages/invest/components/CommitmentFormSubmitButton'
import { CommitmentFormCancelButton } from 'app/pages/invest/components/CommitmentFormCancelButton'
import { useCommitmentActivity } from '../hooks/useCommitmentActivity'
import { DownloadDSOSubscriptionDocument } from 'app/components/DSO/components/DownloadDSOSubscriptionDocument'
import { useParams } from 'react-router-dom'

export const CommitmentFormWrapper = () => {
  const params = useParams<{ dsoId: string; issuerId: string }>()
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
              <CommitmentFormFields
                decimalScale={data.deploymentInfo?.decimals}
                symbol={data.currency.symbol}
                network={data.network?._id}
              />
              <VSpacer size='small' />
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <CommitmentFormCancelButton />
                </Grid>
                <Grid item xs={6}>
                  <CommitmentFormSubmitButton
                    assetId={data.currency._id}
                    minInvestment={data.minimumInvestment}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </CommitmentForm>
  )
}
