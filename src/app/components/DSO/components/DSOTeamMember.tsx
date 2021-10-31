import React from 'react'
import { Box, Grid, TextField } from '@material-ui/core'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { DSOTeamRemoveButton } from 'app/components/DSO/components/DSOTeamRemoveButton'
import { TypedField } from 'components/form/TypedField'
import { RichTextEditor } from 'components/form/RichTextEditor'
import { wysiwygValueExtractor } from 'helpers/forms'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues, DsoTeamMember } from 'types/dso'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { Dropzone } from 'components/dataroom/Dropzone'
import { DSOContainer } from 'app/components/DSO/components/DSOContainer'
import { VSpacer } from 'components/VSpacer'

export interface DSOTeamMemberProps {
  fieldId: string
  index: number
  remove: (field: any) => void
  defaultValue: DsoTeamMember
}

export const DSOTeamMember = (props: DSOTeamMemberProps) => {
  const { defaultValue, fieldId, index, remove } = props
  const { control } = useFormContext<{ team: DSOFormValues['team'] }>()
  const { isTablet } = useAppBreakpoints()
  return (
    <Grid
      item
      container
      alignItems='flex-start'
      wrap={isTablet ? 'wrap' : 'nowrap'}
      direction='column'
    >
      <Grid item container xs={12}>
        <Grid item xs={12} md={2}>
          {/* @ts-ignore */}
          <TypedField
            customRenderer
            key={fieldId}
            control={control}
            component={Dropzone}
            label=''
            defaultValue={defaultValue?.photo ?? ''}
            valueExtractor={documentValueExtractor}
            documentInfo={{
              title: 'Photo',
              type: 'photo'
            }}
            name={['team', index, 'photo']}
          />
        </Grid>
        <Grid container item direction='column' xs={12} md={10}>
          <Grid item>
            <TypedField
              fullWidth
              key={fieldId}
              component={TextField}
              control={control}
              defaultValue={defaultValue?.name ?? ''}
              label='Name'
              name={['team', index, 'name']}
              variant='outlined'
            />
          </Grid>
          <Grid item>
            <Box pt={3} />
          </Grid>
          <Grid item>
            <TypedField
              fullWidth
              key={fieldId}
              control={control}
              component={TextField}
              defaultValue={defaultValue?.position ?? ''}
              label='Position'
              name={['team', index, 'position']}
              variant='outlined'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item container xs={12} direction='column'>
        <Grid item>
          <DSOContainer
            title='About'
            subtitle='Short Introduction about your team member'
          >
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
          </DSOContainer>
        </Grid>
        <Grid
          item
          container
          justify='flex-end'
          alignItems='flex-end'
          direction='column'
        >
          <Grid item>
            <VSpacer size='small' />
            <DSOTeamRemoveButton remove={remove} index={index} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
