import React from 'react'
import { Grid, Box } from '@mui/material'
import { TableView } from 'components/TableWithPagination/TableView'
import { dsoQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { issuanceURL } from 'config/apiURL'
import { useTheme } from '@mui/material/styles'
import { CommitmentTableFilter } from 'app/pages/issuance/components/Commitments/CommitmentTableFilters'
import { columns } from 'app/pages/issuance/components/Commitments/columns'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useParams } from 'react-router-dom'

export const InvestorCommitmentTable = () => {
  const theme = useTheme()
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search', undefined)
  const fundStatus = getFilterValue('fundStatus', undefined)

  const { dsoId } = useParams<{ dsoId: string }>()

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <PageHeader
          styled={false}
          title={'Investor Commitments'}
          variant={'h3'}
          showBreadcrumbs={false}
          noMargin
        />
      </Grid>
      <Grid item>
        <CommitmentTableFilter />
      </Grid>
      <Grid item>
        <Box style={{ backgroundColor: theme.palette.backgrounds.light }}>
          <TableView<any>
            uri={issuanceURL.commitments.getByDSOId(dsoId)}
            name={dsoQueryKeys.getCommitmentsListByDSOId(dsoId)}
            columns={columns}
            filter={{
              searchInvestorName: search,
              fundStatus
            }}
            themeVariant={'primary'}
          />
        </Box>
      </Grid>
    </Grid>
  )
}
