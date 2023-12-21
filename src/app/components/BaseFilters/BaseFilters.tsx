import { Box, Grid } from '@mui/material'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import React, { PropsWithChildren } from 'react'
import { TextInputSearchFilter } from '../TextInputSearchFilter'
import { useTheme } from '@mui/styles'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { QueryFilter } from 'hooks/filters/useQueryFilter'

export const BaseFilters = ({
  children,
  searchLabel = 'Search',
  searchFilterValue = 'search',
  fullWidthSearch = false,
  hideSeachFilter = false,
  showSearchLabel = false,
  hideDateFilter = false,
  showDateLabels = false,
  hasTopBorder = true
}: PropsWithChildren<{
  searchLabel?: string
  searchFilterValue?: QueryFilter
  fullWidthSearch?: boolean
  hideSeachFilter?: boolean
  showSearchLabel?: boolean
  hideDateFilter?: boolean
  showDateLabels?: boolean
  hasTopBorder?: boolean
}>) => {
  const theme = useTheme()

  return (
    <Box
      p={3}
      bgcolor={theme.palette.backgrounds.light}
      sx={{
        borderTop: hasTopBorder ? `1px solid ${theme.palette.divider}` : 0,
        borderRadius: hasTopBorder ? '0 0 10px 10px' : '10px'
      }}
    >
      <Grid container gap={2}>
        {!hideSeachFilter && (
          <Grid item xs={fullWidthSearch ? 12 : true}>
            {showSearchLabel && <InputLabel>Search</InputLabel>}
            <TextInputSearchFilter
              fullWidth
              placeholder={searchLabel}
              filterValue={searchFilterValue}
              inputAdornmentPosition='start'
            />
          </Grid>
        )}
        {!hideDateFilter ? (
          <Grid item xs={12} lg={fullWidthSearch || hideSeachFilter ? 12 : 8}>
            <Grid container direction='row' gap={2}>
              <Grid item xs>
                {showDateLabels && <InputLabel>From</InputLabel>}
                <DateFilter
                  name='fromDate'
                  dateTimePickerProps={{
                    inputProps: {
                      placeholder: !showDateLabels ? 'From' : 'mm/dd/yyyy'
                    }
                  }}
                  width={'100%'}
                />
              </Grid>
              <Grid item xs>
                {showDateLabels && <InputLabel>To</InputLabel>}
                <DateFilter
                  name='toDate'
                  dateTimePickerProps={{
                    inputProps: {
                      placeholder: !showDateLabels ? 'To' : 'mm/dd/yyyy'
                    }
                  }}
                  width={'100%'}
                />
              </Grid>
              {children}
            </Grid>
          </Grid>
        ) : (
          children !== undefined && <Grid item>{children}</Grid>
        )}
      </Grid>
    </Box>
  )
}
