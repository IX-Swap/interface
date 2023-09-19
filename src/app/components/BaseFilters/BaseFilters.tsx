import { Box, Grid } from '@mui/material'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import React, { PropsWithChildren } from 'react'
import { TextInputSearchFilter } from '../TextInputSearchFilter'
import { useTheme } from '@mui/styles'

export const BaseFilters = ({
  children,
  searchLabel = 'Search',
  hideDateFilter = false
}: PropsWithChildren<{ searchLabel?: string; hideDateFilter?: boolean }>) => {
  const theme = useTheme()

  return (
    <Box
      p={3}
      bgcolor={theme.palette.backgrounds.light}
      sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px'
      }}
    >
      <Grid container>
        <Grid item xs={12} lg={hideDateFilter ? 10 : 4} pr={2}>
          <TextInputSearchFilter
            fullWidth
            placeholder={searchLabel}
            inputAdornmentPosition='start'
          />
        </Grid>
        {!hideDateFilter ? (
          <Grid item xs={12} lg={8}>
            <Grid container direction='row' gap={2}>
              <Grid item xs>
                <DateFilter
                  name='fromDate'
                  dateTimePickerProps={{
                    inputProps: {
                      placeholder: 'From'
                    }
                  }}
                  width={'100%'}
                />
              </Grid>
              <Grid item xs>
                <DateFilter
                  name='toDate'
                  dateTimePickerProps={{
                    inputProps: {
                      placeholder: 'To'
                    }
                  }}
                  width={'100%'}
                />
              </Grid>
              {children}
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12} lg={2}>
            {children}
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
