import { Box, Grid } from '@mui/material'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import React, { PropsWithChildren } from 'react'
import { TextInputSearchFilter } from '../TextInputSearchFilter'
import { useTheme } from '@mui/styles'

export const BaseFilters = ({
  children,
  searchLabel = 'Search',
  hideDateFilter = false,
  hasTopBorder = true
}: PropsWithChildren<{
  searchLabel?: string
  hideDateFilter?: boolean
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
        <Grid item xs>
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
          children !== undefined && <Grid item>{children}</Grid>
        )}
      </Grid>
    </Box>
  )
}
