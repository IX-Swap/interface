import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { DSOTeamRemoveButton } from 'app/components/DSO/components/DSOTeamRemoveButton'
import { TypedField } from 'components/form/TypedField'
import { DataroomUploader } from 'components/dataroom/DataroomUploader'
import { DataroomAvatarUploader } from 'components/dataroom/DataroomAvatarUploader'
import { RichTextEditor } from 'components/form/RichTextEditor'
import { wysiwygValueExtractor } from 'helpers/forms'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues, DsoTeamMember } from 'types/dso'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export interface DSOTeamMemberProps {
  fieldId: string
  index: number
  remove: (field: any) => void
  defaultValue: DsoTeamMember
}

export const DSOTeamMember = (props: DSOTeamMemberProps) => {
  const { defaultValue, fieldId, index, remove } = props
  const { control } = useFormContext<{ team: DSOFormValues['team'] }>()
  const { isTablet, theme } = useAppBreakpoints()

  return (
    <Grid
      item
      container
      alignItems='flex-start'
      wrap={isTablet ? 'wrap' : 'nowrap'}
      spacing={3}
    >
      <Grid
        item
        xs={12}
        style={{ maxWidth: 60, marginRight: theme.spacing(2) }}
      >
        {/* @ts-ignore */}
        <TypedField
          customRenderer
          key={fieldId}
          control={control}
          component={DataroomUploader}
          label='Photo'
          name={['team', index, 'photo']}
          render={DataroomAvatarUploader}
          defaultValue={defaultValue?.photo ?? ''}
          valueExtractor={documentValueExtractor}
          documentInfo={{
            title: 'Photo',
            type: 'photo'
          }}
        />
      </Grid>
      <Grid item container direction='column' spacing={1}>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <TypedField
              fullWidth
              key={fieldId}
              component={Input}
              control={control}
              defaultValue={defaultValue?.name ?? ''}
              label='Name'
              name={['team', index, 'name']}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <TypedField
              fullWidth
              key={fieldId}
              control={control}
              component={Input}
              defaultValue={defaultValue?.position ?? ''}
              label='Position'
              name={['team', index, 'position']}
            />
          </Grid>
        </Grid>
        <Grid item>
          {/* @ts-ignore */}
          <TypedField
            key={fieldId}
            control={control}
            component={RichTextEditor}
            customRenderer
            defaultValue={defaultValue?.about ?? ''}
            label='About'
            name={['team', index, 'about']}
            valueExtractor={wysiwygValueExtractor}
          />
        </Grid>
      </Grid>
      <Grid item>
        <DSOTeamRemoveButton remove={remove} index={index} />
      </Grid>
    </Grid>
  )
}
