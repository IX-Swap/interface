import React from 'react'
import { Grid } from '@material-ui/core'
import { DSOTeamMemberPhoto } from 'app/components/DSO/components/DSOTeamMemberPhoto'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { LabelledValue } from 'components/LabelledValue'
import { VSpacer } from 'components/VSpacer'
import { DsoTeamMember } from 'types/dso'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export interface DSOTeamMemberViewProps {
  dsoId: string
  member: DsoTeamMember
}

export const DSOTeamMemberView = (props: DSOTeamMemberViewProps) => {
  const { member, dsoId } = props
  const { isTablet } = useAppBreakpoints()

  return (
    <Grid
      key={member._id}
      item
      container
      alignItems='flex-start'
      wrap={isTablet ? 'wrap' : 'nowrap'}
      spacing={3}
      style={{ marginBottom: 24 }}
    >
      <Grid item>
        <DSOTeamMemberPhoto
          dsoId={dsoId}
          photoId={member.photo}
          variant='rounded'
          size={250}
        />
      </Grid>

      <Grid item container direction='column' spacing={1}>
        <Grid item container spacing={2}>
          <Grid item xs={6} md={3}>
            <LabelledValue label='Name' value={member.name} />
          </Grid>
          <Grid item xs={6} md={3}>
            <LabelledValue label='Position' value={member.position} />
          </Grid>
        </Grid>

        <Grid item>
          <VSpacer size='small' />
        </Grid>

        <Grid item>
          <LabelledValue
            label='About'
            value={renderStringToHTML(member.about)}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
