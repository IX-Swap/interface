import { Box, Grid, Typography } from '@mui/material'
import { DSOContainer } from 'app/components/DSO/components/DSOContainer'
import { DSOTeamRemoveButton } from 'app/components/DSO/components/DSOTeamRemoveButton'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { RichTextEditor } from 'components/form/RichTextEditor'
import { TypedField } from 'components/form/TypedField'
import { VSpacer } from 'components/VSpacer'
import { wysiwygValueExtractor } from 'helpers/forms'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues, DsoTeamMember } from 'types/dso'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { TextInput } from 'ui/TextInput/TextInput'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { Divider } from 'ui/Divider'

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
  const renderTitle = (index: number) =>
    index === 0 ? 'Team Member' : `(${index + 1}) Team Member`

  return (
    <Grid
      item
      container
      alignItems='flex-start'
      wrap={isTablet ? 'wrap' : 'nowrap'}
      direction='column'
    >
      <Grid item container direction={'column'} xs={12} spacing={5}>
        {index !== 0 && (
          <Grid item>
            <Divider />
          </Grid>
        )}
        <Grid
          item
          container
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Grid item>
            <FormSectionHeader title={renderTitle(index)} />
          </Grid>
          {index > 0 && (
            <Grid item>
              <DSOTeamRemoveButton remove={remove} index={index} />
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} md={2}>
          <TypedField
            customRenderer
            key={fieldId}
            control={control}
            component={FileUpload}
            placeHolder={<Box mt={1}>Upload File</Box>}
            label={
              <Typography>
                Upload photo{' '}
                <Typography display={'inline'} color={'text.secondary'}>
                  (Optional)
                </Typography>
              </Typography>
            }
            defaultValue={defaultValue?.photo}
            valueExtractor={documentValueExtractor}
            documentInfo={{
              title: 'Photo',
              type: 'photo'
            }}
            name={['team', index, 'photo']}
          />
        </Grid>
        <Grid container item xs={12} md={10} spacing={2}>
          <Grid item xs={12} md={6}>
            <TypedField
              fullWidth
              key={fieldId}
              component={TextInput}
              placeholder={'Team member Name'}
              control={control}
              defaultValue={defaultValue?.name ?? ''}
              label='Name'
              name={['team', index, 'name']}
              variant='outlined'
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TypedField
              fullWidth
              key={fieldId}
              control={control}
              placeholder={'Team member position'}
              component={TextInput}
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
      </Grid>
    </Grid>
  )
}
