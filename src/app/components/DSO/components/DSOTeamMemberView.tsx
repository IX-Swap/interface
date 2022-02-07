import React from 'react'
import { Grid } from '@mui/material'
import { DSOTeamMemberPhoto } from 'app/components/DSO/components/DSOTeamMemberPhoto'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { LabelledValue } from 'components/LabelledValue'
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
      container
      alignItems='flex-start'
      wrap={isTablet ? 'wrap' : 'nowrap'}
      spacing={3}
      direction='column'
    >
      <Grid item>
        <Grid container spacing={3}>
          <Grid item>
            <DSOTeamMemberPhoto
              dsoId={dsoId}
              photoId={member.photo}
              variant='square'
              size={128}
            />
          </Grid>
          <Grid item>
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <LabelledValue label='Name' value={member.name} />
              </Grid>
              <Grid item>
                <LabelledValue label='Position' value={member.position} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <LabelledValue
          label='About'
          value={renderStringToHTML(member.about)}
          align='justify'
        />
      </Grid>
    </Grid>
  )
}
