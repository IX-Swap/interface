import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { Card, CardContent, Grid } from '@mui/material'
import { CommitmentFormFields } from 'app/pages/invest/components/CommitmentFormFields'
import { CommitmentHeader } from 'app/pages/invest/components/CommitmentHeader'
import { CommitmentForm } from 'app/pages/invest/components/CommitmentForm'
import { VSpacer } from 'components/VSpacer'
import { CommitmentFormSubmitButton } from 'app/pages/invest/components/CommitmentFormSubmitButton'
import { CommitmentFormCancelButton } from 'app/pages/invest/components/CommitmentFormCancelButton'
import { useCommitmentActivity } from '../hooks/useCommitmentActivity'
import { DownloadDSOSubscriptionDocument } from 'app/components/DSO/components/DownloadDSOSubscriptionDocument'
import { useParams } from 'react-router-dom'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CommitmentFormCommitButton } from 'app/pages/invest/components/CommitFormCommitButton'
import { capitalStructureWithFunds } from 'types/dso'

export const CommitmentFormWrapper = () => {
  const params = useParams<{ dsoId: string; issuerId: string }>()
  const { data, isLoading } = useDSOById(params.dsoId, params.issuerId)

  useCommitmentActivity(data?._id)

  if (isLoading || data === undefined) {
    return null
  }

  const isCampaign = data?.isCampaign === true
  const downloadButton = isCampaign
    ? 'Download Investment Agreement'
    : 'Download Subscription Document'

  return (
    <CommitmentForm
      dso={data._id}
      isCampaign={Boolean(data?.isCampaign)}
      currency={data.currency._id}
      defaultValues={{ pricePerUnit: data.pricePerUnit, tnc: false }}
    >
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <PageHeader title={data.tokenName} />
        </Grid>
        <Grid item>
          <CommitmentHeader dso={data} />
        </Grid>
        <Grid item container justifyContent='center'>
          <Card style={{ width: 450 }} elevation={0}>
            <CardContent>
              <DownloadDSOSubscriptionDocument
                dsoId={data._id}
                variant='contained'
                color='primary'
                size='medium'
                fullWidth
              >
                {downloadButton}
              </DownloadDSOSubscriptionDocument>
              <VSpacer size='small' />
              <CommitmentFormFields
                decimalScale={data.deploymentInfo?.decimals}
                symbol={data.currency.symbol}
                network={data.network?._id}
                isCampaign={isCampaign}
              />
              <VSpacer size='medium' />
              <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={4}>
                  <CommitmentFormCancelButton />
                </Grid>
                {!isCampaign &&
                  capitalStructureWithFunds.includes(data.capitalStructure) && (
                    <Grid item xs={4}>
                      <CommitmentFormCommitButton
                        assetId={data.currency._id}
                        minInvestment={data.minimumInvestment}
                        dsoId={params.dsoId}
                        currency={data.currency._id}
                      />
                    </Grid>
                  )}

                <Grid item xs={4}>
                  <CommitmentFormSubmitButton
                    assetId={data.currency._id}
                    minInvestment={data.minimumInvestment}
                    dsoId={params.dsoId}
                    currency={data.currency._id}
                    disabled={data?.disableInvestInCampaign === true}
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
