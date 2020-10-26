import React, { memo } from 'react'
import { Grid, Input } from '@material-ui/core'
import { documentValueExtractor } from 'v2/app/components/DSO/utils'
import { DSOTeamRemoveButton } from 'v2/app/components/DSO/components/DSOTeamRemoveButton'
import { TypedField } from 'v2/components/form/TypedField'
import { DataroomUploader } from 'v2/components/dataroom/DataroomUploader'
import { DataroomAvatarUploader } from 'v2/components/dataroom/DataroomAvatarUploader'
import { RichTextEditor } from 'v2/components/form/RichTextEditor'
import { plainValueExtractor } from 'v2/helpers/forms'
import { useFormContext } from 'react-hook-form'
import { DsoTeamMember } from 'v2/types/dso'

export interface DSOTeamMemberProps {
  fieldId: string
  index: number
  remove: (field: any) => void
  defaultValue: DsoTeamMember
}

export const DSOTeamMember = memo(
  (props: DSOTeamMemberProps) => {
    const { defaultValue, fieldId, index, remove } = props
    const { control } = useFormContext()

    return (
      <Grid item container alignItems='flex-start' wrap='nowrap' spacing={3}>
        <Grid item>
          {/* @ts-ignore */}
          <TypedField
            key={fieldId}
            control={control}
            component={DataroomUploader}
            label='Photo'
            name={`team[${index}].photo` as any}
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
            <Grid item>
              <TypedField
                key={fieldId}
                component={Input}
                control={control}
                defaultValue={defaultValue?.name ?? ''}
                label='Name'
                name={`team[${index}].name` as any}
              />
            </Grid>
            <Grid item>
              <TypedField
                key={fieldId}
                control={control}
                component={Input}
                defaultValue={defaultValue?.position ?? ''}
                label='Position'
                name={`team[${index}].position` as any}
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
              name={`team[${index}].about` as any}
              valueExtractor={plainValueExtractor}
            />
          </Grid>
        </Grid>
        <Grid item>
          <DSOTeamRemoveButton remove={remove} index={index} />
        </Grid>
      </Grid>
    )
  },
  (prevProps, nextProps) => {
    console.log(prevProps.defaultValue, nextProps.defaultValue)
    return false
  }
)
