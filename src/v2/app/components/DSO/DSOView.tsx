import React from 'react'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { Avatar, Grid, List, ListItem, Typography } from '@material-ui/core'
import { renderStringToHTML } from 'v2/app/components/DSO/utils'
import { DSOToken } from 'v2/app/components/DSO/components/DSOToken'
import { DataroomHeader } from 'v2/components/dataroom/DataroomHeader'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'
import { LabelledValue } from 'v2/components/LabelledValue'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import { DataroomViewRow } from 'v2/components/dataroom/DataroomViewRow'
import { VSpacer } from 'v2/components/VSpacer'
import { useSetPageTitle } from 'v2/app/hooks/useSetPageTitle'

export interface _DSOView_Props {
  data: DigitalSecurityOffering
}

export const DSOView = (props: _DSOView_Props) => {
  const { data } = props

  useSetPageTitle(data.tokenName)

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container spacing={3}>
        <Grid item>
          <ViewDocument documentId={data.logo} ownerId={data.user}>
            {url => (
              <Avatar src={url ?? ''} style={{ width: 80, height: 80 }} />
            )}
          </ViewDocument>
        </Grid>

        <Grid item>
          <LabelledValue label='Token Name' value={data.tokenName} />
        </Grid>

        <Grid item>
          <LabelledValue label='Symbol' value={data.tokenSymbol} />
        </Grid>

        <Grid item>
          <LabelledValue
            label='Launch Date'
            value={formatDateToMMDDYY(data.launchDate)}
          />
        </Grid>

        <Grid item>
          <LabelledValue
            label='Corporate'
            value={data.corporate.companyLegalName}
          />
        </Grid>

        <Grid item>
          <LabelledValue label='Issuer Name' value={data.issuerName} />
        </Grid>

        <Grid item>
          <LabelledValue label='Currency' value={data.currency.symbol} />
        </Grid>
      </Grid>

      <Grid item container direction='row' spacing={3}>
        <DSOContainer title='Introduction' item xs={8}>
          <Typography>{renderStringToHTML(data.introduction)}</Typography>
        </DSOContainer>

        <DSOContainer title='Introduction' item xs={4}>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <LabelledValue
                label='Corporate'
                value={data.corporate.companyLegalName}
              />
            </Grid>

            <Grid item>
              <LabelledValue label='Status' value={data.status} />
            </Grid>

            <Grid item>
              <LabelledValue
                label='Capital Structure'
                value={data.capitalStructure}
              />
            </Grid>

            <Grid item>
              <LabelledValue label='Unit Price' value={data.pricePerUnit} />
            </Grid>

            <Grid item>
              <LabelledValue
                label='Total Fundraising Amount'
                value={data.totalFundraisingAmount}
              />
            </Grid>

            <Grid item>
              <LabelledValue
                label='Minimum Investment'
                value={data.minimumInvestment}
              />
            </Grid>
          </Grid>
        </DSOContainer>
      </Grid>

      <Grid item>
        <DSOContainer title='Subscription Document' item xs={12}>
          <DataroomViewRow
            title='Subscription Document'
            document={data.subscriptionDocument}
          />
        </DSOContainer>
      </Grid>

      <DSOContainer title='Offering Terms' item xs={12}>
        <Grid item container spacing={2}>
          <Grid item xs={4} container direction='column' spacing={2}>
            <Grid item>
              <LabelledValue
                label='Investment Period'
                value={data.investmentPeriod}
              />
            </Grid>

            <Grid item>
              <LabelledValue
                label='Investment Structure'
                value={data.investmentStructure}
              />
            </Grid>

            <Grid item>
              <LabelledValue label='Interest Rate' value={data.interestRate} />
            </Grid>
          </Grid>

          <Grid item xs={4} container direction='column' spacing={2}>
            <Grid item>
              <LabelledValue
                value={data.dividendYield}
                label='Dividend Yield'
              />
            </Grid>

            <Grid item>
              <LabelledValue
                value={data.equityMultiple}
                label='Equity Multiple'
              />
            </Grid>

            <Grid item>
              <LabelledValue value={data.leverage} label='Leverage' />
            </Grid>
          </Grid>

          <Grid item xs={4} container direction='column' spacing={2}>
            <Grid item>
              <LabelledValue value={data.grossIRR} label='Gross IRR' />
            </Grid>

            <Grid item>
              <LabelledValue
                value={data.distributionFrequency}
                label='Distribution Frequency'
              />
            </Grid>
          </Grid>
        </Grid>
      </DSOContainer>

      <DSOContainer title='Business Model' item xs={12}>
        <Typography>{renderStringToHTML(data.businessModel)}</Typography>
      </DSOContainer>

      <DSOContainer title='Token' item xs={12}>
        <DSOToken />
      </DSOContainer>

      <DSOContainer title='Use of Proceeds' item xs={12}>
        <Typography>{renderStringToHTML(data.useOfProceeds)}</Typography>
      </DSOContainer>

      <DSOContainer title='Dataroom' item xs={12}>
        <DataroomHeader />
        <List disablePadding>
          {data.documents?.map((document, index) => (
            <ListItem
              key={document._id}
              divider={index !== (data?.documents?.length ?? 0) - 1}
              style={{ minHeight: 50 }}
            >
              <DataroomViewRow title={document.type} document={document} />
            </ListItem>
          ))}
        </List>
      </DSOContainer>

      <DSOContainer title='Fund Raising Milestone' item xs={12}>
        <Typography>{renderStringToHTML(data.fundraisingMilestone)}</Typography>
      </DSOContainer>

      <DSOContainer title='Team' item xs={12}>
        {data.team.map(member => (
          <Grid
            key={member._id}
            item
            container
            alignItems='flex-start'
            wrap='nowrap'
            spacing={3}
            style={{ marginBottom: 24 }}
          >
            <Grid item>
              <ViewDocument documentId={member.photo ?? ''} ownerId={data.user}>
                {url => (
                  <Avatar
                    src={url ?? ''}
                    variant='rounded'
                    style={{ width: 250, height: 250 }}
                  />
                )}
              </ViewDocument>
            </Grid>

            <Grid item container direction='column' spacing={1}>
              <Grid item container spacing={2}>
                <Grid item xs={2}>
                  <LabelledValue label='Name' value={member.name} />
                </Grid>
                <Grid item xs={2}>
                  <LabelledValue label='Position' value={member.position} />
                </Grid>
              </Grid>
              <Grid item>
                <VSpacer size='small' />
              </Grid>
              <Grid item>
                <LabelledValue
                  label='About'
                  value={renderStringToHTML(member.about)}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </DSOContainer>
    </Grid>
  )
}
