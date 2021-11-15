import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { BannerTitle } from 'app/pages/admin/components/BannerTitle'
import { TypedField } from 'components/form/TypedField'
import { Dropzone } from 'components/dataroom/Dropzone'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { DataroomFileType } from 'config/dataroom'
import { useFormContext } from 'react-hook-form'
import { useUpdateBanner } from 'app/pages/admin/hooks/useUpdateBanner'
import { useBannersList } from 'app/pages/admin/hooks/useBannersList'
import Typography from '@material-ui/core/Typography'

export const BannerBaseFields = () => {
  const { control, setValue, watch } = useFormContext()
  const title = watch('title')
  const banner = watch('banner')
  const [updateBanner, { isLoading }] = useUpdateBanner(banner)
  const { data } = useBannersList()
  const isUploadBannerDisabled = data !== undefined && data.length >= 5

  return (
    <Grid container>
      <Grid item xs={12}>
        <VSpacer size={'medium'} />
        <Grid container alignItems={'center'} justify={'space-between'}>
          <Grid item xs={8}>
            <BannerTitle
              text={title}
              onChange={value => {
                setValue('title', value)
              }}
            />
          </Grid>
          <Grid item>
            <Button
              color={'primary'}
              variant={'contained'}
              disabled={isLoading || banner === undefined}
              onClick={async () => {
                await updateBanner({ title: title })
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <VSpacer size={'medium'} />
        {/* @ts-expect-error */}
        <TypedField
          customRenderer
          component={Dropzone}
          size={['100%', '100%']}
          fullWidth
          type={'banner'}
          name='banner'
          disabled={isUploadBannerDisabled}
          control={control}
          valueExtractor={documentValueExtractor}
          accept={DataroomFileType.image}
          documentInfo={{
            title: title
          }}
        />
        {isUploadBannerDisabled && (
          <Typography
            variant={'body1'}
            style={{ color: '#D20000', marginTop: 8 }}
          >
            Maximum limit has reached to 5 images. Please remove any unnecessary
            image before uploading new image.
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}
