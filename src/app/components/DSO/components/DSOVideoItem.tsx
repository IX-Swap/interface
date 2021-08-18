import React from 'react'
import { Box, Grid, TextField } from '@material-ui/core'
import { DSOTeamRemoveButton } from 'app/components/DSO/components/DSOTeamRemoveButton'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues, DsoVideoLink } from 'types/dso'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'

export interface DSOVideoItemProps {
  fieldId: string
  index: number
  remove: (field: any) => void
  defaultValue: DsoVideoLink
}

export const DSOVideoItem = (props: DSOVideoItemProps) => {
  const { defaultValue, fieldId, index, remove } = props
  const { control } = useFormContext<{
    videoLinks: DSOFormValues['videoLinks']
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
            component={TextField}
            control={control}
            defaultValue={defaultValue?.title ?? ''}
            label='Video Title'
            name={['videoLinks', index, 'title']}
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
            component={TextField}
            defaultValue={defaultValue?.link ?? ''}
            label='Link Source URL'
            name={['videoLinks', index, 'link']}
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
          justify='flex-end'
          alignItems='flex-end'
          direction='column'
        >
          <Grid item>
            <VSpacer size='small' />
            {index >= 3 && (
              <DSOTeamRemoveButton remove={remove} index={index} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
