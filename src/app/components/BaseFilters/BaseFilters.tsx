import { Box, Grid } from '@mui/material'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import React, { PropsWithChildren } from 'react'
import { TextInputSearchFilter } from '../TextInputSearchFilter'
import { useTheme } from '@mui/styles'

export const BaseFilters = ({
  children,
  searchLabel = 'Search'
}: PropsWithChildren<{ searchLabel?: string }>) => {
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
        <Grid item xs={12} lg={6} pr={2} mt={3.5}>
          <TextInputSearchFilter
            fullWidth
            placeholder={searchLabel}
            inputAdornmentPosition='start'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Grid container direction='row' alignItems='end' gap={2}>
            <Grid item xs>
              <DateFilter
                name='fromDate'
                dateTimePickerProps={{
                  placeholder: 'From'
                }}
                width={'100%'}
              />
            </Grid>
            <Grid item xs>
              <DateFilter
                name='toDate'
                dateTimePickerProps={{
                  placeholder: 'To'
                }}
                width={'100%'}
              />
            </Grid>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
