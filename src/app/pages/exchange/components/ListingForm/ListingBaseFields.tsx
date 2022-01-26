import React from 'react'
import { Box, Grid, TextField } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { dateTimeValueExtractor } from 'helpers/forms'
import { CorporateSelect } from 'components/form/CorporateSelect'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { useFormContext } from 'react-hook-form'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { DataroomFileType } from 'config/dataroom'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { Dropzone } from 'components/dataroom/Dropzone'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { initialListingFormValues } from 'app/pages/exchange/consts/listing'
import { ListingHiddenFields } from 'app/pages/exchange/components/ListingForm/ListingHiddenFields'

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
            component={Dropzone}
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
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextField}
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
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextField}
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
                inputVariant='outlined'
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
                inputVariant='outlined'
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
