import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { TypedField } from 'v2/components/form/TypedField'
import { DataroomUploader } from 'v2/components/dataroom/DataroomUploader'
import { DataroomAvatarUploader } from 'v2/components/dataroom/DataroomAvatarUploader'
import { DatePicker } from 'v2/components/form/DatePicker'
import { dateTimeValueExtractor } from 'v2/helpers/forms'
import { CorporateSelect } from 'v2/components/form/CorporateSelect'
import { NetworkSelect } from 'v2/components/form/NetworkSelect'
import { AssetSelect } from 'v2/components/form/AssetSelect'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'
import { documentValueExtractor } from 'v2/app/components/DSO/utils'
import { DataroomFileType } from 'v2/config/dataroom'

export const DSOBaseFields = (props: { isNew: boolean }) => {
  const { isNew } = props
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
          <TypedField
            customRenderer
            component={DataroomUploader}
            name='logo'
            label='Logo'
            control={control}
            render={DataroomAvatarUploader}
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
            control={control}
          />
        </Grid>

        <Grid item>
          <TypedField
            component={Input}
            label='Symbol'
            name='tokenSymbol'
            control={control}
          />
        </Grid>

        <Grid item>
          {/* @ts-ignore */}
          <TypedField
            component={DatePicker}
            customRenderer
            label='Launch Date'
            name='launchDate'
            control={control}
            valueExtractor={dateTimeValueExtractor}
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

        {isNew && (
          <Grid item>
            <TypedField
              control={control}
              component={NetworkSelect}
              name='network'
              label='Network'
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}
