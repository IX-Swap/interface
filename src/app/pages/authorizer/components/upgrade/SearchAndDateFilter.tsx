import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { SearchQueryFilterGroup } from 'components/SearchQueryFilter/SearchQueryFilterGroup/SearchQueryFilterGroup'
import { GroupedSearchFilter } from 'app/pages/authorizer/components/GroupedSearchFilter'
import { GroupedDateTimeFilter } from 'app/pages/authorizer/components/GroupedFromDateFilter'
import { SearchQueryFilterGroupApply } from 'components/SearchQueryFilter/SearchQueryFilterGroupApply'
import { SearchQueryFilterGroupReset } from 'components/SearchQueryFilter/SearchQueryFilterGroupReset'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { booleanValueExtractor } from 'helpers/forms'
// import { ClosedDSOsFilter } from 'app/pages/authorizer/components/ClosedDSOFilter'

export const SearchAndDateFilter = () => {
  const { control } = useFormContext()
  const category = useAuthorizerCategory()
  const isCommitments = category === 'commitments'
  const onInvestorApplications =
    category === 'corporates' || category === 'individuals'

  return (
    <SearchQueryFilterGroup>
      <Grid container>
        {/* {isCommitments && (
          <Grid item xs={12}>
            <ClosedDSOsFilter />
          </Grid>
        )} */}
        <Grid
          item
          xs={12}
          md={3.5}
          display={'flex'}
          flexDirection={'row'}
          gap={3}
          px={3}
        >
          <GroupedDateTimeFilter
            name='fromDate'
            groupFilter
            dateTimePickerProps={{ placeholder: 'From' }}
          />
          <GroupedDateTimeFilter
            name='toDate'
            groupFilter
            dateTimePickerProps={{ placeholder: 'To' }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={onInvestorApplications ? 5.2 : 8.5}
          gap={3}
          display={'flex'}
          flexDirection={'row'}
        >
          <GroupedSearchFilter isCommitment={isCommitments} />
          <Grid
            container
            sx={{
              height: '52px',
              width: '117px'
            }}
            item
          >
            <SearchQueryFilterGroupReset
              filters={['search', 'toDate', 'fromDate']}
              variant='outlined'
              size='small'
              disableElevation
            >
              Reset
            </SearchQueryFilterGroupReset>
            <SearchQueryFilterGroupApply
              filters={['search', 'toDate', 'fromDate']}
              color='primary'
              variant='outlined'
              disableElevation
            >
              Submit
            </SearchQueryFilterGroupApply>
          </Grid>
        </Grid>
        {onInvestorApplications && (
          <Grid item xs={12} md={3.3} pl={3}>
            <Typography variant={'subtitle2'}>Filter by</Typography>

            <Box display={'flex'} flexDirection={'row'}>
              <SearchQueryFilter<'filterByKYCStatus'>
                name='filterByKYCStatus'
                defaultValue={undefined}
              >
                {({ value, onChange }) => (
                  <TypedField
                    customRenderer
                    valueExtractor={booleanValueExtractor}
                    component={Checkbox}
                    onClick={(e: any) => onChange(e.target.checked)}
                    defaultValue={value?.toString() === 'true'}
                    control={control}
                    label='KYC Status'
                    name='kycStatus'
                  />
                )}
              </SearchQueryFilter>
              <SearchQueryFilter<'filterByAccreditationStatus'>
                name='filterByAccreditationStatus'
                defaultValue={undefined}
              >
                {({ value, onChange }) => (
                  <TypedField
                    customRenderer
                    valueExtractor={booleanValueExtractor}
                    component={Checkbox}
                    onClick={(e: any) => onChange(e.target.checked)}
                    defaultValue={value?.toString() === 'true'}
                    control={control}
                    label='Accreditation Status'
                    name='accreditationStatus'
                  />
                )}
              </SearchQueryFilter>
            </Box>
          </Grid>
        )}
      </Grid>
    </SearchQueryFilterGroup>
  )
}
