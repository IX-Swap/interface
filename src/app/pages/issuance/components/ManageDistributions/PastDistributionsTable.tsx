import { Grid, Typography } from '@material-ui/core'
import { renderStatusColumn } from 'app/pages/authorizer/hooks/useAuthorizerView'
import { TableView } from 'components/TableWithPagination/TableView'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderAmount } from 'helpers/tables'
import React from 'react'
import { useParams } from 'react-router-dom'
import { DigitalSecurityOffering } from 'types/dso'

export interface PastDistributionsTableProps {
  dso: DigitalSecurityOffering
}

export const PastDistributionsTable = ({
  dso
}: PastDistributionsTableProps) => {
  const { dsoId } = useParams<{ dsoId: string }>()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h5'>Past Distribution</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableView<any>
          uri={'/issuance/distribution/list'}
          name={`distributions-${dsoId}`}
          columns={[
            {
              label: 'Date',
              key: 'distributionDate',
              render: formatDateToMMDDYY
            },
            {
              align: 'right',
              headAlign: 'right',
              label: 'Amount Distributed',
              key: 'totalAmount',
              render: (val, _) => renderAmount(val, dso)
            },
            {
              align: 'right',
              headAlign: 'right',
              label: 'Distributed Amount Per Token',
              key: 'amountPerToken'
            },
            { label: 'Status', key: 'status', render: renderStatusColumn }
          ]}
          themeVariant='primary'
        />
      </Grid>
    </Grid>
  )
}
