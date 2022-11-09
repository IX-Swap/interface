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

export const getWrapValue = (isTablet: boolean) =>
  isTablet ? 'wrap' : 'nowrap'
export const getRemoveButtonWidth = (isTablet: boolean) =>
  isTablet ? '100%' : 50
export const getRemoveButtonWrapperWidth = (isTablet: boolean) =>
  isTablet ? '100%' : 'initial'

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
      wrap={getWrapValue(isTablet)}
      direction='column'
    >
      <Grid
        item
        container
        xs={12}
        wrap={getWrapValue(isTablet)}
        alignItems={'flex-end'}
        spacing={{ xs: 5, md: 2 }}
      >
        <Grid item width={'100%'} height={122}>
          <TypedField
            fullWidth
            key={fieldId}
            component={TextInput}
            control={control}
            defaultValue={defaultValue?.title ?? ''}
            label='Video Title'
            helperText='Title'
            placeholder='Title'
            name={['videos', index, 'title']}
            variant='outlined'
          />
        </Grid>
        <Grid item width={'100%'} height={122}>
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
            helperText='Source'
            placeholder='Source'
          />
        </Grid>

        <Grid
          item
          width={getRemoveButtonWrapperWidth(isTablet)}
          height={122}
          style={{ paddingTop: '42px' }}
        >
          <DSOTeamRemoveButton
            sx={{ width: getRemoveButtonWidth(isTablet), height: 50 }}
            disabled={false}
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
