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
import { VSpacer } from 'components/VSpacer'
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
          <FormSectionHeader
            hasBorderBottom={false}
            title='DSO Information'
            variant='h5'
          />
        </Grid>
        <Grid item>
          <TypedField
            customRenderer
            component={FileUpload}
            name='logo'
            label='Upload Logo'
            placeHolder='Upload File'
            control={control}
            valueExtractor={documentValueExtractor}
            accept={DataroomFileType.image}
            documentInfo={{
              type: 'DSO Logo'
            }}
            isOptional
            helperText='Upload Photo'
          />
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12}>
              <TypedField
                control={control}
                component={CapitalStructureSelect}
                label='Capital Structure'
                displayEmpty
                name='capitalStructure'
                helperText='Select capital structure'
                variant='outlined'
                inputProps={{ 'data-testid': 'capital-structure' }}
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Token Name'
                name='tokenName'
                disabled={isLive}
                control={control}
                helperText='Name of the token offering'
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
                isOptional
                optionalText='(2-6 alphanumeric characters)'
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={NetworkSelect}
                label='Network'
                name='network'
                disabled={!isNew}
                control={control}
                placeHolder='Select blockchain network'
                variant='outlined'
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Unique Identifier Code'
                name='uniqueIdentifierCode'
                disabled={isLive}
                control={control}
                helperText='ISIN or CUSIP number'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                component={CorporateSelect}
                label='Corporate'
                name='corporate'
                control={control}
                placeHolder='Select corporate'
                variant='outlined'
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Issuer Name'
                name='issuerName'
                control={control}
                helperText='Issuer'
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
                placeHolder='Preferred currency'
                variant='outlined'
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
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
                helperText='mm/dd/yyyy'
                inputVariant='outlined'
                withIcon
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
                helperText='mm/dd/yyyy'
                inputVariant='outlined'
                withIcon
              />
            </Grid>
            <VSpacer size='small' />
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
