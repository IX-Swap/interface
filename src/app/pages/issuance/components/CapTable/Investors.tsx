import { Button, Grid } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { issuanceURL } from 'config/apiURL'
import { investQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { generatePath, useParams } from 'react-router-dom'
import { Commitment } from 'types/commitment'
import { formatDateToMMDDYY } from 'helpers/dates'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { formatAmount } from 'helpers/numbers'
import { SearchFilter } from 'app/components/SearchFilter'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export const Investors = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data, isLoading } = useDSOById(dsoId, issuerId)
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search')

  if (
    data === undefined ||
    isLoading ||
    dsoId === undefined ||
    issuerId === undefined
  ) {
    return null
  }

  const renderTokens = (value: any, row: Commitment) => {
    const tokenPrice = data.pricePerUnit
    return formatAmount(row.totalAmount / tokenPrice)
  }

  const renderTotalAmount = (value: any, row: Commitment) => {
    return `${row.currency.symbol} ${value as string}`
  }

  const renderOwnership = (value: any, row: Commitment) => {
    const tokenPrice = data.pricePerUnit
    const totalTokens = data.insight.raisedTotal / tokenPrice
    const tokenValue = row.totalAmount / tokenPrice

    return totalTokens > 1 ? formatAmount((tokenValue / totalTokens) * 100) : 0
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item xs={12} md={4}>
            <SearchFilter fullWidth placeholder='Search Name' />
          </Grid>
          <Grid item>
            <Button
              component={AppRouterLinkComponent}
              to={generatePath(IssuanceRoute.manageDistributions, {
                issuerId,
                dsoId
              })}
              variant='contained'
              color='primary'
              style={{ height: 40 }}
              disableElevation
            >
              Manage distributions
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableView<Commitment>
          uri={issuanceURL.commitments.getByDSOId(dsoId)}
          name={investQueryKeys.getDSOById(dsoId, issuerId)}
          columns={[
            { label: 'Date', key: 'createdAt', render: formatDateToMMDDYY },
            { label: 'Investor’s Name', key: 'user.name' },
            {
              label: 'Amount Invested',
              key: 'totalAmount',
              render: renderTotalAmount,
              headAlign: 'right',
              align: 'right'
            },
            { label: 'Tokens', key: 'tokens', render: renderTokens },
            { label: 'Ownership (%)', key: 'user', render: renderOwnership }
          ]}
          filter={{
            searchInvestorName: search,
            fundStatus: 'Funds transferred'
          }}
          themeVariant={'primary'}
        />
      </Grid>
    </Grid>
  )
}
