import { Grid } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { AssetSelect } from 'components/form/AssetSelect/AssetSelect'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { Checkbox } from 'components/form/Checkbox'
import { CorporateSelect } from 'components/form/CorporateSelect'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { TypedField } from 'components/form/TypedField'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { DataroomFileType } from 'config/dataroom'
import { booleanValueExtractor, dateTimeValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { TextInput } from 'ui/TextInput/TextInput'

export interface DSOBaseFieldsProps {
  isNew: boolean
  isLive: boolean
}

export const DSOBaseFields = (props: DSOBaseFieldsProps) => {
  const { isNew, isLive } = props
  const { control } = useFormContext<DSOFormValues>()
  return (
    <Grid item>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <FormSectionHeader title='DSO Information' />
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
                component={TextInput}
                label='Token Name'
                name='tokenName'
                disabled={isLive}
                control={control}
                helperText='Name of the token that describes your offering the best'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Symbol'
                name='tokenSymbol'
                disabled={isLive}
                control={control}
                helperText='Token symbol'
                variant='outlined'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Unique Identifier Code'
                name='uniqueIdentifierCode'
                disabled={isLive}
                control={control}
                helperText='ISIN or CUSIP Number'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                component={CorporateSelect}
                label='Corporate'
                name='corporate'
                control={control}
                helperText='Select your corporate from the list'
                variant='outlined'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Issuer Name'
                name='issuerName'
                control={control}
                helperText='Issuer name'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12}>
              <TypedField
                customRenderer
                defaultValue={false}
                valueExtractor={booleanValueExtractor}
                component={Checkbox}
                control={control}
                label={'Is this a campaign?'}
                name='isCampaign'
                data-testid='is-campaign'
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
