import { Box, Grid } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { ListingHiddenFields } from 'app/pages/issuance/components/ListingForm/ListingHiddenFields'
import { initialListingFormValues } from 'app/pages/issuance/consts/listing'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { CorporateSelect } from 'components/form/CorporateSelect'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { DataroomFileType } from 'config/dataroom'
import { positiveNumberFormat } from 'config/numberFormat'
import { dateTimeValueExtractor, numericValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { TextInput } from 'ui/TextInput/TextInput'
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
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <FormSectionHeader title='General Information' />
        </Grid>
        <Grid item>
          <TypedField
            customRenderer
            component={FileUpload}
            name='logo'
            label='Upload Logo'
            control={control}
            valueExtractor={documentValueExtractor}
            accept={DataroomFileType.image}
            documentInfo={{
              type: 'DSO Logo'
            }}
          />
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TypedField
                control={control}
                component={CapitalStructureSelect}
                label='Capital Structure'
                name='capitalStructure'
                helperText='Offering terms will be changed based on your capital structure'
                variant='outlined'
                inputProps={{ 'data-testid': 'capital-structure' }}
                disabled={
                  isDataFromDSO &&
                  watch('capitalStructure') !==
                    initialListingFormValues.capitalStructure
                }
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
                helperText='Select your blockchain network from the list'
                variant='outlined'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
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
                helperText='Name of the token that describes your offering the best'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TypedField
                component={TextInput}
                label='Symbol'
                name='tokenSymbol'
                disabled={
                  isLive ||
                  (isDataFromDSO &&
                    watch('tokenSymbol') !==
                      initialListingFormValues.tokenSymbol)
                }
                control={control}
                helperText='Token symbol'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TypedField
                component={NumericInput}
                customRenderer
                numberFormat={positiveNumberFormat}
                label='Decimal Places'
                name='decimals'
                control={control}
                helperText='Decimal Places'
                valueExtractor={numericValueExtractor}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TypedField
                component={CorporateSelect}
                label='Corporate Name'
                name='corporate'
                control={control}
                helperText='Select your corporate from the list'
                variant='outlined'
                disabled={
                  isDataFromDSO &&
                  watch('corporate') !== initialListingFormValues.corporate
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={DateTimePicker}
                customRenderer
                label='Launch Date'
                name='launchDate'
                control={control}
                disabled={
                  isLive || (isDataFromDSO && watch('launchDate') !== null)
                }
                valueExtractor={dateTimeValueExtractor}
                defaultValue={null}
                helperText='Offering launch date'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                component={DateTimePicker}
                customRenderer
                label='Completion Date'
                name='completionDate'
                control={control}
                valueExtractor={dateTimeValueExtractor}
                defaultValue={null}
                helperText='Offering completion date'
                disabled={isDataFromDSO && watch('completionDate') !== null}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box display='none'>
        <ListingHiddenFields />
      </Box>
    </Grid>
  )
}
