import React, { useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { BannerTitle } from 'app/pages/admin/components/BannerTitle'
import { TypedField } from 'components/form/TypedField'
import { Dropzone } from 'components/dataroom/Dropzone'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { DataroomFileType } from 'config/dataroom'
import { useFormContext } from 'react-hook-form'

export const BannerBaseFields = () => {
  const [bannerTitle, setBannerTitle] = useState<string>('Title')
  const { control } = useFormContext()

  return (
    <Grid container>
      <Grid item xs={12}>
        <VSpacer size={'medium'} />
        <Grid container alignItems={'center'} justify={'space-between'}>
          <Grid item>
            <BannerTitle
              text={bannerTitle}
              onChange={value => setBannerTitle(value)}
            />
          </Grid>
          <Grid item>
            <Button type={'submit'} color={'primary'} variant={'contained'}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <VSpacer size={'medium'} />
        {/* @ts-ignore */}
        <TypedField
          customRenderer
          component={Dropzone}
          previewSize={['100%', '100%']}
          fullWidth
          isNewThemeOn
          name='banner'
          control={control}
          valueExtractor={documentValueExtractor}
          accept={DataroomFileType.image}
          documentInfo={{
            title: bannerTitle
          }}
        />
      </Grid>
    </Grid>
  )
}
