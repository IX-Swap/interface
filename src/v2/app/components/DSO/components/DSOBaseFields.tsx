import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { TypedField } from 'v2/components/form/TypedField'
import { DataroomUploader } from 'v2/components/dataroom/DataroomUploader'
import { DataroomAvatarUploader } from 'v2/components/dataroom/DataroomAvatarUploader'
import { dateTimeValueExtractor } from 'v2/helpers/forms'
import { CorporateSelect } from 'v2/components/form/CorporateSelect'
import { NetworkSelect } from 'v2/components/form/NetworkSelect'
import { AssetSelect } from 'v2/components/form/AssetSelect'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'
import { documentValueExtractor } from 'v2/app/components/DSO/utils'
import { DataroomFileType } from 'v2/config/dataroom'
import { DateTimePicker } from 'v2/components/form/_DateTimePicker'
import getTime from 'date-fns/getTime'

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
            component={DataroomUploader}
            name='logo'
            label='Logo'
            control={control}
            render={renderProps => (
              <DataroomAvatarUploader {...renderProps} type='image' />
            )}
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
            minDate={getTime(Date.now())}
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
