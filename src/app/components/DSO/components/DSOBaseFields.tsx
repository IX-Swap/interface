import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { dateTimeValueExtractor } from 'helpers/forms'
import { CorporateSelect } from 'components/form/CorporateSelect'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { AssetSelect } from 'components/form/AssetSelect'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { DataroomFileType } from 'config/dataroom'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { Dropzone } from 'components/dataroom/Dropzone'

export interface DSOBaseFieldsProps {
  isNew: boolean
  isLive: boolean
}

export const DSOBaseFields = (props: DSOBaseFieldsProps) => {
  const { isNew, isLive } = props
  const { control } = useFormContext<DSOFormValues>()

  return (
    <Grid
      xs={12}
      container
      item
      direction='row'
      alignItems='flex-start'
      spacing={3}
    >
      <Grid item container spacing={3}>
        <Grid item>
          {/* @ts-ignore */}
          <TypedField
            customRenderer
            component={Dropzone}
            name='logo'
            label='Logo'
            control={control}
            valueExtractor={documentValueExtractor}
            accept={DataroomFileType.image}
            documentInfo={{
              type: 'DSO Logo'
            }}
          />
        </Grid>

        <Grid item>
          <TypedField
            component={Input}
            label='Token Name'
            name='tokenName'
            disabled={isLive}
            control={control}
          />
        </Grid>

        <Grid item>
          <TypedField
            component={Input}
            label='Symbol'
            name='tokenSymbol'
            disabled={isLive}
            control={control}
          />
        </Grid>

        <Grid item>
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
          />
        </Grid>

        <Grid item>
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
          />
        </Grid>

        <Grid item>
          <TypedField
            component={CorporateSelect}
            label='Corporate'
            name='corporate'
            control={control}
          />
        </Grid>

        <Grid item>
          <TypedField
            component={Input}
            label='Issuer Name'
            name='issuerName'
            control={control}
          />
        </Grid>

        <Grid item>
          <TypedField
            assetType='Currency'
            component={AssetSelect}
            label='Currency'
            name='currency'
            control={control}
          />
        </Grid>

        <Grid item>
          <TypedField
            component={NetworkSelect}
            label='Network'
            name='network'
            disabled={!isNew}
            control={control}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
