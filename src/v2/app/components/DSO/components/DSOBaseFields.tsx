import React from 'react'
import { Grid, TextField, Input } from '@material-ui/core'
import { EditableField } from 'v2/components/form/EditableField'
import { NewDataroomUploader } from 'v2/components/form/NewDataroomUploader'
import { DataroomAvatar } from 'v2/components/form/DataroomAvatar'
import { DatePicker } from 'v2/components/form/DatePicker'
import {
  dateTimeValueExtractor,
  plainValueExtractor
} from 'v2/components/form/createTypedForm'
import { CorporateSelect } from 'v2/components/form/CorporateSelect'
import { AssetSelect } from 'v2/components/form/AssetSelect'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'
import { documentValueExtractor } from 'v2/app/components/DSO/utils'

export const DSOBaseFields = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <Grid
      title='Base Fields'
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
          <EditableField
            component={NewDataroomUploader}
            name='logo'
            label='Logo'
            control={control}
            render={DataroomAvatar}
            valueExtractor={documentValueExtractor}
            documentInfo={{
              type: 'Logo'
            }}
          />
        </Grid>

        <Grid item>
          <EditableField
            component={Input}
            label='Token Name'
            name='tokenName'
            control={control}
          />
        </Grid>

        <Grid item>
          <EditableField
            component={Input}
            label='Symbol'
            name='tokenSymbol'
            control={control}
          />
        </Grid>

        <Grid item>
          {/* @ts-ignore */}
          <EditableField
            component={DatePicker}
            label='Launch Date'
            name='launchDate'
            control={control}
            valueExtractor={dateTimeValueExtractor}
          />
        </Grid>

        <Grid item>
          <EditableField
            component={CorporateSelect}
            label='Corporate'
            name='corporate'
            control={control}
          />
        </Grid>

        <Grid item>
          <EditableField
            component={Input}
            label='Issuer Name'
            name='issuerName'
            control={control}
          />
        </Grid>

        <Grid item>
          <EditableField
            assetType='Currency'
            component={AssetSelect}
            label='Currency'
            name='currency'
            control={control}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
