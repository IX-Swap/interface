import React from 'react'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import { DsoTeamMember } from 'v2/types/dso'
import { getImgUrl } from 'v2/helpers/httpRequests'
import storageHelper from '../../../../helpers/storageHelper'
import EditableField from 'v2/components/form/EditableField'
import EditableWysiwyg from 'v2/components/form/EditableWysiwyg'
import ImageUploader from 'v2/components/form/ImageUploader'
import { DocumentGuide } from 'v2/types/document'

interface DSOTeamMemberProps {
  member: DsoTeamMember
  index: number
  editMode?: boolean
  dsoId: string
  onRemoveTeamMember: () => void
}

export const DSOTeamMember = (props: DSOTeamMemberProps) => {
  const { member, editMode = false, dsoId, index, onRemoveTeamMember } = props
  const guide: DocumentGuide = {
    title: 'Team member photo',
    label: 'Member Photo',
    type: 'dsoTeamMemberPhoto'
  }

  const setPhoto = async ({ _id = '' }: { _id: string }) => {
    return await getImgUrl(
      editMode
        ? `/dataroom/raw/${storageHelper.getUserId()}/${_id ?? ''}`
        : `/issuance/dso/dataroom/photos/raw/${dsoId}/${_id}`
    )
  }

  return (
    <Box pt={4} px={4} pb={2} style={{ borderBottom: '1px solid #f0f0f0' }}>
      {editMode && (
        <Box style={{ textAlign: 'right' }}>
          <Button onClick={() => onRemoveTeamMember()}>
            <RemoveIcon /> Remove
          </Button>
        </Box>
      )}
      <Box style={{ display: 'flex' }}>
        <Box mr={2}>
          <ImageUploader
            hasDelete={false}
            editMode={editMode}
            variant='square'
            name={`team.${index}.photo`}
            getter={setPhoto}
            width={272}
            guide={guide}
          />
        </Box>
        <Box>
          <Grid container>
            {!editMode && (
              <Grid item>
                <Typography variant='h5'>{member.name}</Typography>
                <Typography>
                  <b>{member.position}</b>
                </Typography>
              </Grid>
            )}
            {editMode && (
              <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
                <EditableField
                  style={{ minWidth: '250px' }}
                  editMode={editMode}
                  label='Name'
                  required
                  value={member.name}
                  name={`team.${index}.name`}
                  previewMode={
                    <Typography variant='h5'>{member.name}</Typography>
                  }
                />
                <EditableField
                  style={{ minWidth: '250px' }}
                  margin='normal'
                  editMode={editMode}
                  label='Position'
                  required
                  value={member.position}
                  name={`team.${index}.position`}
                  previewMode={
                    <Typography>
                      <b>{member.position}</b>
                    </Typography>
                  }
                />
              </Grid>
            )}
          </Grid>
          <Box mt={4}>
            {!editMode && (
              <Typography>
                <span dangerouslySetInnerHTML={{ __html: member.about }} />
              </Typography>
            )}
            {editMode && (
              <EditableWysiwyg
                value={member.about ?? 'About the member'}
                name={`team.${index}.about`}
                editMode={editMode}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
