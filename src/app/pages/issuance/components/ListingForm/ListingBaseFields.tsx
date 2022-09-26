import { Box, Grid, Typography } from '@mui/material'
import { initialListingFormValues } from 'app/pages/issuance/consts/listing'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { CorporateSelect } from 'components/form/CorporateSelect'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { numberWithMaxFormat } from 'config/numberFormat'
import { dateTimeValueExtractor, numericValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { ListingHiddenFields } from 'app/pages/issuance/components/ListingForm/ListingHiddenFields'
export interface ListingBaseFieldsProps {
  isNew: boolean
  isLive: boolean
  isDataFromDSO: boolean
}

export const ListingBaseFields = (props: ListingBaseFieldsProps) => {
  const { isNew, isLive, isDataFromDSO } = props
  const { control, watch } = useFormContext()

  return (
    <Grid item>
      <Grid container direction='column' spacing={5}>
        <Grid item>
          <FormSectionHeader title='General Information' />
        </Grid>

        <Grid item container>
          <Grid item xs={12} md={12}>
            <TypedField
              control={control}
              component={CapitalStructureSelect}
              label='Capital Structure'
              name='capitalStructure'
              displayEmpty
              variant='outlined'
              inputProps={{ 'data-testid': 'capital-structure' }}
              disabled={
                isDataFromDSO &&
                watch('capitalStructure') !==
                  initialListingFormValues.capitalStructure
              }
            />
          </Grid>
        </Grid>
        <Grid item container spacing={{ xs: 5, md: 3 }}>
          <Grid item xs={12} md={6}>
            <TypedField
              component={CorporateSelect}
              label='Corporate Name'
              name='corporate'
              control={control}
              variant='outlined'
              disabled={
                isDataFromDSO &&
                watch('corporate') !== initialListingFormValues.corporate
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TypedField
              component={DateTimePicker}
              customRenderer
              withIcon
              label='Launch Date'
              name='launchDate'
              control={control}
              disabled={
                isLive || (isDataFromDSO && watch('launchDate') !== null)
              }
              valueExtractor={dateTimeValueExtractor}
              defaultValue={null}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={{ xs: 5, md: 3 }}>
          <Grid item xs={12} md={6}>
            <TypedField
              component={TextInput}
              label='Token Name'
              name='tokenName'
              disabled={
                isLive ||
                (isDataFromDSO &&
                  watch('tokenName') !== initialListingFormValues.tokenName)
              }
              control={control}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TypedField
              component={NetworkSelect}
              label='Network'
              name='network'
              disabled={
                !isNew ||
                (isDataFromDSO &&
                  watch('network') !== initialListingFormValues.network)
              }
              control={control}
              variant='outlined'
            />
          </Grid>
        </Grid>

        <Grid item container spacing={{ xs: 5, md: 3 }}>
          <Grid item xs={12} md={6}>
            <TypedField
              component={TextInput}
              label={
                <Typography>
                  Symbol{' '}
                  <Typography display={'inline'} color={'text.secondary'}>
                    (2-6 alphanumeric characters)
                  </Typography>
                </Typography>
              }
              name='tokenSymbol'
              disabled={
                isLive ||
                (isDataFromDSO &&
                  watch('tokenSymbol') !== initialListingFormValues.tokenSymbol)
              }
              control={control}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TypedField
              fullWidth
              component={NumericInput}
              customRenderer
              numberFormat={{ ...numberWithMaxFormat(18) }}
              label='Decimal Places'
              disabled={
                isDataFromDSO &&
                watch('decimals') !== initialListingFormValues.decimals
              }
              name='decimals'
              control={control}
              valueExtractor={numericValueExtractor}
            />
          </Grid>
        </Grid>
      </Grid>
      <Box display='none'>
        <ListingHiddenFields />
      </Box>
    </Grid>
  )
}
