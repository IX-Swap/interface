import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { dsoQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { Actions } from 'app/pages/invest/components/DSOTable/Actions'
import { issuanceURL } from 'config/apiURL'
import { useTheme } from '@material-ui/core/styles'
import { CommitmentTableFilter } from 'app/pages/issuance/components/Commitments/CommitmentTableFilters'
import { columns } from 'app/pages/issuance/components/Commitments/columns'
import { commitments } from '__fixtures__/commitments'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const InvestorCommitmentTable = () => {
  const theme = useTheme()
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search', undefined)
  const fundStatus = getFilterValue('fundStatus', undefined)

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <PageHeader
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
          {/* TODO Add type and do refactoring after complete backend api endpoint */}
          <TableView<any>
            fakeItems={commitments}
            uri={issuanceURL.dso.getAllApproved}
            name={dsoQueryKeys.getApprovedList}
            columns={columns}
            hasActions
            actions={Actions}
            filter={{
              search,
              fundStatus
            }}
            isNewThemeOn
          />
        </Box>
      </Grid>
    </Grid>
  )
}
