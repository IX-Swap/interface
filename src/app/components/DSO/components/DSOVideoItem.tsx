import React from 'react'
import { Box, Grid } from '@mui/material'
import { DSOTeamRemoveButton } from 'app/components/DSO/components/DSOTeamRemoveButton'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues, DsoVideo } from 'types/dso'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'
import { TextInput } from 'ui/TextInput/TextInput'

export interface DSOVideoItemProps {
  isNew: boolean
  fieldId: string
  index: number
  remove: (field: any) => void
  defaultValue: DsoVideo
}

export const DSOVideoItem = (props: DSOVideoItemProps) => {
  const { defaultValue, fieldId, index, remove, isNew } = props
  const { control } = useFormContext<{
    videos: DSOFormValues['videos']
  }>()
  const { isTablet } = useAppBreakpoints()

  return (
    <Grid
      item
      container
      alignItems='flex-start'
      wrap={isTablet ? 'wrap' : 'nowrap'}
      direction='column'
    >
      <Grid item container xs={12} wrap={isTablet ? 'wrap' : 'nowrap'}>
        <Grid item xs={12} md={6}>
          <TypedField
            fullWidth
            key={fieldId}
            component={TextInput}
            control={control}
            defaultValue={defaultValue?.title ?? ''}
            label='Video Title'
            name={['videos', index, 'title']}
            variant='outlined'
            helperText={'Title of the link'}
          />
        </Grid>
        <Box pl={3} />
        <Grid item xs={12} md={6}>
          <TypedField
            fullWidth
            key={fieldId}
            control={control}
            component={TextInput}
            defaultValue={defaultValue?.link ?? ''}
            label='Link Source URL'
            name={['videos', index, 'link']}
            variant='outlined'
            helperText={'URL source where the investors will be redirected to'}
          />
        </Grid>
      </Grid>
      <VSpacer size={'small'} />
      <Grid item container xs={12} direction='column'>
        <Grid
          item
          container
          justifyContent='flex-end'
          alignItems='flex-end'
          direction='column'
        >
          <Grid item>
            <VSpacer size='small' />
            {(index >= 3 || !isNew) && (
              <DSOTeamRemoveButton remove={remove} index={index} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
