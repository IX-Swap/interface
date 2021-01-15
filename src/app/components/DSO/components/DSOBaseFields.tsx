import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { dateTimeValueExtractor, numericValueExtractor } from 'helpers/forms'
import { CorporateSelect } from 'components/form/CorporateSelect'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { AssetSelect } from 'components/form/AssetSelect'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { DataroomFileType } from 'config/dataroom'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { VSpacer } from 'components/VSpacer'
import { Dropzone } from 'components/dataroom/Dropzone'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { NumericInput } from 'components/form/NumericInput'
import { positiveNumberFormat } from 'config/numberFormat'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export interface DSOBaseFieldsProps {
  isNew: boolean
  isLive: boolean
}

export const DSOBaseFields = (props: DSOBaseFieldsProps) => {
  const { isNew, isLive } = props
  const { control, watch } = useFormContext<DSOFormValues>()
  const capitalStructure = watch('capitalStructure')

  return (
    <Grid item>
      <VSpacer size='medium' />
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <FormSectionHeader title='DSO Information' />
        </Grid>
        <Grid item>
          {/* @ts-ignore */}
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                component={NetworkSelect}
                label='Network'
                name='network'
                disabled={!isNew}
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
                disabled={isLive}
                control={control}
                helperText='Name of the token that describes your offering the best'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TypedField
                component={TextField}
                label='Symbol'
                name='tokenSymbol'
                disabled={isLive}
                control={control}
                helperText='Token symbol'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TypedField
                component={NumericInput}
                numberFormat={positiveNumberFormat}
                label='Decimal Places'
                name='decimalPlaces'
                disabled={capitalStructure?.toLowerCase() === 'equity'}
                control={control}
                helperText='Decimal Places'
                variant='outlined'
                valueExtractor={numericValueExtractor}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TypedField
                component={CorporateSelect}
                label='Corporate Structure'
                name='corporate'
                control={control}
                helperText='Select your corporate from the list'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TypedField
                assetType='Currency'
                component={AssetSelect}
                label='Currency'
                name='currency'
                control={control}
                helperText='Your preferred currency'
                variant='outlined'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {/* @ts-ignore */}
              <TypedField
                component={DateTimePicker}
                customRenderer
                label='Launch Date'
                name='launchDate'
                control={control}
                disabled={isLive}
                valueExtractor={dateTimeValueExtractor}
                // @ts-expect-error
                defaultValue={null}
                helperText='Offering launch date'
                inputVariant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* @ts-ignore */}
              <TypedField
                component={DateTimePicker}
                customRenderer
                label='Completion Date'
                name='completionDate'
                control={control}
                valueExtractor={dateTimeValueExtractor}
                // @ts-expect-error
                defaultValue={null}
                helperText='Offering completion date'
                inputVariant='outlined'
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
