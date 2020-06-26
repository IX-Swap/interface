import React from 'react'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import { DsoTeamMember } from '../../../../../types/dso'
import { getImgUrl } from '../../../../../helpers/httpRequests'
import storageHelper from '../../../../../helpers/storageHelper'
import EditableField from '../../../../../components/form/editable-field'
import EditableWysiwyg from '../../../../../components/form/editable-wysiwyg'
import ImageUploader from '../../../../../components/form/image-uploader'
import { DocumentGuide } from '../../../../../types/document'

interface TeamMemberProps {
  member: DsoTeamMember
  index: number
  editMode?: boolean
  dsoId: string
  onRemoveTeamMember: () => void
}

const TeamMember = ({
  member,
  editMode = false,
  dsoId,
  index,
  onRemoveTeamMember
}: TeamMemberProps) => {
  const guide: DocumentGuide = {
    title: 'Team member photo',
    label: 'Member Photo',
    type: 'dsoTeamMemberPhoto'
  }

  const setPhoto = async ({ _id = '' } : {_id: string}) => {
    const x = await getImgUrl(
      editMode
        ? `/dataroom/raw/${storageHelper.getUserId()}/${_id || ''}`
        : `/issuance/dso/dataroom/photos/raw/${dsoId}/${_id}`
    )

    return x
  }

  return (
    <Box pt={4} px={4} pb={2} style={{ borderBottom: "1px solid #f0f0f0" }}>
      {editMode && (
        <Box style={{ textAlign: "right" }}>
          <Button onClick={() => onRemoveTeamMember()}>
            <RemoveIcon /> Remove
          </Button>
        </Box>
      )}
      <Box style={{ display: "flex" }}>
        <Box mr={2}>
          <ImageUploader
            hasDelete={false}
            editMode={editMode}
            variant="square"
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
                <Typography variant="h5">{member.name}</Typography>
                <Typography>
                  <b>{member.position}</b>
                </Typography>
              </Grid>
            )}
            {editMode && (
              <Grid item style={{ display: "flex", flexDirection: "column" }}>
                <EditableField
                  style={{ minWidth: "250px" }}
                  editMode={editMode}
                  label="Name"
                  value={member.name}
                  name={`team.${index}.name`}
                  previewMode={
                    <Typography variant="h5">{member.name}</Typography>
                  }
                />
                <EditableField
                  style={{ minWidth: "250px" }}
                  margin="normal"
                  editMode={editMode}
                  label="Position"
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
                value={member.about || "About the member"}
                name={`team.${index}.about`}
                editMode={editMode}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TeamMember
