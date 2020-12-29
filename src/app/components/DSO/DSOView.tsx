import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOContainer } from 'app/components/DSO/components/DSOContainer'
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography
} from '@material-ui/core'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { DSOToken } from 'app/components/DSO/components/DSOToken'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { LabelledValue } from 'components/LabelledValue'
import { formatDateAndTime } from 'helpers/dates'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { renderMonths, renderPercentage } from 'helpers/rendering'
import { formatMoney } from 'helpers/numbers'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { DSOLogo } from './components/DSOLogo'
import { DownloadDSOSubscriptionDocument } from 'app/components/DSO/components/DownloadDSOSubscriptionDocument'
import { DownloadDSODocument } from 'app/components/DSO/components/DownloadDSODocument'
import { DSOTeamMemberView } from 'app/components/DSO/components/DSOTeamMemberView'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export interface DSOViewProps {
  data: DigitalSecurityOffering
  showAuthorizations?: boolean
}

export const DSOView = (props: DSOViewProps) => {
  const { data, showAuthorizations = false } = props
  const { isTablet, theme } = useAppBreakpoints()

  useSetPageTitle(data.tokenName)

  return (
    <Grid container direction='column' spacing={3}>
      {showAuthorizations && (
        <Grid item>
          <RejectionMessage data={data} />
        </Grid>
      )}

      <Grid item container spacing={3}>
        <Grid item>
          <DSOLogo dsoId={data._id} size={80} />
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
            value={formatDateAndTime(data.launchDate)}
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

        <Grid item>
          <LabelledValue label='Blockchain Network' value={data.network.name} />
        </Grid>
      </Grid>

      <Grid item container direction='row' alignItems='stretch'>
        <DSOContainer title='Introduction' item xs={12} md={8}>
          <Typography>{renderStringToHTML(data.introduction)}</Typography>
        </DSOContainer>

        <Grid item xs={12} md={4}>
          <DSOContainer
            title='Introduction'
            style={{
              paddingLeft: isTablet ? 0 : theme.spacing(2),
              paddingTop: isTablet ? theme.spacing(2) : 0,
              height: '100%'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} md={12}>
                <LabelledValue
                  label='Corporate'
                  value={data.corporate.companyLegalName}
                />
              </Grid>

              <Grid item xs={6} md={12}>
                <LabelledValue label='Status' value={data.status} />
              </Grid>

              <Grid item xs={6} md={12}>
                <LabelledValue
                  label='Capital Structure'
                  value={data.capitalStructure}
                />
              </Grid>

              <Grid item xs={6} md={12}>
                <LabelledValue
                  label='Unit Price'
                  value={formatMoney(data.pricePerUnit, data.currency.symbol)}
                />
              </Grid>

              <Grid item xs={6} md={12}>
                <LabelledValue
                  label='Total Fundraising Amount'
                  value={formatMoney(
                    data.totalFundraisingAmount,
                    data.currency.symbol
                  )}
                />
              </Grid>

              <Grid item xs={6} md={12}>
                <LabelledValue
                  label='Minimum Investment'
                  value={formatMoney(data.minimumInvestment, data.tokenSymbol)}
                />
              </Grid>
            </Grid>
          </DSOContainer>
        </Grid>
      </Grid>

      <Grid item>
        <DSOContainer title='Subscription Document' item xs={12}>
          {data.subscriptionDocument === undefined ? (
            <Grid container justify='flex-end'>
              <Typography color='error'>Not provided</Typography>
            </Grid>
          ) : (
            <Grid container item justify='flex-end'>
              <DownloadDSOSubscriptionDocument
                size='small'
                variant='outlined'
                dsoId={data._id}
              />
            </Grid>
          )}
        </DSOContainer>
      </Grid>

      <DSOContainer title='Offering Terms' item xs={12}>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              label='Investment Period'
              value={renderMonths(data.investmentPeriod)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              value={renderPercentage(data.dividendYield)}
              label='Dividend Yield'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              value={renderPercentage(data.grossIRR)}
              label='Gross IRR'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              label='Investment Structure'
              value={data.investmentStructure}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              value={renderPercentage(data.equityMultiple)}
              label='Equity Multiple'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              value={data.distributionFrequency}
              label='Distribution Frequency'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              label='Interest Rate'
              value={renderPercentage(data.interestRate)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              value={renderPercentage(data.leverage)}
              label='Leverage'
            />
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
        <TableContainer>
          <Table>
            <DataroomHeader />
            <TableBody>
              {data.documents?.map(document => (
                <TableRow key={document._id}>
                  <DataroomViewRow
                    title={document.type}
                    document={document}
                    downloader={
                      <DownloadDSODocument
                        dsoId={data._id}
                        documentId={document._id}
                      />
                    }
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DSOContainer>

      <DSOContainer title='Fund Raising Milestone' item xs={12}>
        <Typography>{renderStringToHTML(data.fundraisingMilestone)}</Typography>
      </DSOContainer>

      <DSOContainer title='Team' item xs={12}>
        {data.team.map(member => (
          <DSOTeamMemberView dsoId={data._id} member={member} />
        ))}
      </DSOContainer>
    </Grid>
  )
}
