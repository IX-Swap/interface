import { Box, Grid, Typography } from '@mui/material'
import { initialListingFormValues } from 'app/pages/issuance/consts/listing'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { CorporateSelect } from 'components/form/CorporateSelect'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { numberFormat } from 'config/numberFormat'
import { dateTimeValueExtractor, numericValueExtractor } from 'helpers/forms'
import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { ListingHiddenFields } from 'app/pages/issuance/components/ListingForm/ListingHiddenFields'
import { CURRENCIES, CurrencySelect } from 'components/form/CurrencySelect'
import { useAssetsData } from 'hooks/asset/useAssetsData'

export interface ListingBaseFieldsProps {
  isNew: boolean
  isLive: boolean
  isDataFromDSO: boolean
}

export const ListingBaseFields = (props: ListingBaseFieldsProps) => {
  const { isNew, isDataFromDSO } = props
  const { control, watch } = useFormContext()
  const { data } = useAssetsData('Currency')
  const currencyList = useMemo(() => data.list.reverse(), [data])

  return (
    <Grid item>
      <Grid container direction='column' spacing={5}>
        <Grid item>
          <FormSectionHeader title='Overview of Selected Token' />
        </Grid>
        <Grid item container spacing={{ xs: 5, md: 3 }}>
          <Grid item xs={12} md={6}>
            <TypedField
              control={control}
              component={
                !isNew ||
                (isDataFromDSO &&
                  watch('capitalStructure') !==
                    initialListingFormValues.capitalStructure)
                  ? TextInput
                  : CapitalStructureSelect
              }
              label='Capital Structure'
              name='capitalStructure'
              displayEmpty
              variant='outlined'
              inputProps={{ 'data-testid': 'capital-structure' }}
              disabled={
                !isNew ||
                (isDataFromDSO &&
                  watch('capitalStructure') !==
                    initialListingFormValues.capitalStructure)
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TypedField
              control={control}
              component={CurrencySelect}
              options={currencyList.map(cur => ({
                label:
                  CURRENCIES.find(option => option.value === cur.symbol)
                    ?.label ?? cur.symbol,
                value: cur._id
              }))}
              label='Currency'
              name='currency'
              displayEmpty
              variant='outlined'
              disabled={
                !isNew ||
                (isDataFromDSO &&
                  watch('currency') !== initialListingFormValues.currency)
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
              isDisabled={
                !isNew ||
                (isDataFromDSO &&
                  watch('corporate') !== initialListingFormValues.corporate)
              }
              disabled={
                !isNew ||
                (isDataFromDSO &&
                  watch('corporate') !== initialListingFormValues.corporate)
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
                !isNew || (isDataFromDSO && watch('launchDate') !== null)
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
                !isNew ||
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
              isDisabled={
                !isNew ||
                (isDataFromDSO &&
                  watch('network') !== initialListingFormValues.network)
              }
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
                !isNew ||
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
              numberFormat={{ ...numberFormat }}
              isAllowed={(values: any) => {
                const { value } = values
                return value <= 18
              }}
              label='Decimal Places'
              disabled={
                !isNew ||
                (isDataFromDSO &&
                  watch('decimals') !== initialListingFormValues.decimals)
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
