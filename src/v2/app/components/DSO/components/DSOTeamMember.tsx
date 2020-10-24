import React, { memo } from 'react'
import { Grid, Input } from '@material-ui/core'
import { documentValueExtractor } from 'v2/app/components/DSO/utils'
import { DSOTeamRemoveButton } from 'v2/app/components/DSO/components/DSOTeamRemoveButton'
import { EditableField } from 'v2/components/form/EditableField'
import { NewDataroomUploader } from 'v2/components/form/NewDataroomUploader'
import { DataroomAvatar } from 'v2/components/form/DataroomAvatar'
import { RichTextEditor } from 'v2/components/form/RichTextEditor'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'
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
          <EditableField
            key={fieldId}
            control={control}
            component={NewDataroomUploader}
            label='Photo'
            name={`team[${index}].photo` as any}
            render={DataroomAvatar}
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
              <EditableField
                key={fieldId}
                component={Input}
                control={control}
                defaultValue={defaultValue?.name ?? ''}
                label='Name'
                name={`team[${index}].name` as any}
              />
            </Grid>
            <Grid item>
              <EditableField
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
            <EditableField
              key={fieldId}
              control={control}
              component={RichTextEditor}
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
