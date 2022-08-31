import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DSOTeamRemoveButton } from 'app/components/DSO/components/DSOTeamRemoveButton'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues, DsoVideo } from 'types/dso'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { TextInput } from 'ui/TextInput/TextInput'
import { Divider } from 'ui/Divider'

export interface DSOVideoItemProps {
  fieldId: string
  index: number
  remove: (field: any) => void
  defaultValue: DsoVideo
}

export const DSOVideoItem = (props: DSOVideoItemProps) => {
  const { defaultValue, fieldId, index, remove } = props
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
      <Grid
        item
        container
        xs={12}
        wrap={isTablet ? 'wrap' : 'nowrap'}
        alignItems={'flex-end'}
        spacing={{ xs: 5, md: 2 }}
      >
        <Grid item width={'100%'}>
          <TypedField
            fullWidth
            key={fieldId}
            component={TextInput}
            control={control}
            defaultValue={defaultValue?.title ?? ''}
            label='Video Title'
            placeholder='Title'
            name={['videos', index, 'title']}
            variant='outlined'
          />
        </Grid>

        <Grid item width={'100%'}>
          <TypedField
            fullWidth
            key={fieldId}
            control={control}
            component={TextInput}
            defaultValue={defaultValue?.link ?? ''}
            label={
              <Typography>
                Link Source{' '}
                <Typography color={'text.secondary'} display={'inline'}>
                  (URL)
                </Typography>
              </Typography>
            }
            name={['videos', index, 'link']}
            variant='outlined'
            placeholder='Source'
          />
        </Grid>

        <Grid item width={isTablet ? '100%' : 'initial'}>
          <DSOTeamRemoveButton
            sx={{ width: isTablet ? '100%' : 50, height: 50 }}
            disabled={index === 0}
            remove={remove}
            index={index}
          />
        </Grid>

        {isTablet && (
          <Grid item width={'100%'}>
            <Divider />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}
