import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { DigitalSecurityOffering } from 'types/dso'
import { dsoQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useDSOTableColumns } from 'app/pages/invest/hooks/useDSOTableColumns'
import { Actions } from 'app/pages/invest/components/DSOTable/Actions'
import { DSOTableFilters } from 'app/pages/invest/components/DSOTable/DSOTableFilters'
import { issuanceURL } from 'config/apiURL'
import { useTheme } from '@material-ui/core/styles'

export const DSOTable = () => {
  const theme = useTheme()
  const { columns } = useDSOTableColumns()
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search', undefined)
  const capitalStructure = getFilterValue('capitalStructure', undefined)
  const currency = getFilterValue('currency', undefined)
  const network = getFilterValue('network', undefined)
  const isPriceAscending = getFilterValue('isPriceAscending', undefined)

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <DSOTableFilters />
      </Grid>
      <Grid item>
        <Box style={{ backgroundColor: theme.palette.backgrounds.light }}>
          <TableView<DigitalSecurityOffering>
            uri={issuanceURL.dso.getAllApproved}
            name={dsoQueryKeys.getApprovedList}
            columns={columns}
            hasActions
            actions={Actions}
            filter={{
              search,
              capitalStructure,
              network,
              currency: currency !== '' ? currency : undefined,
              isPriceAscending:
                isPriceAscending !== undefined
                  ? isPriceAscending === 'yes'
                  : undefined
            }}
            isNewThemeOn
          />
        </Box>
      </Grid>
    </Grid>
  )
}
