import React, { useState, useEffect, useCallback } from 'react'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RemoveIcon from '@material-ui/icons/Remove'
import { DsoTeamMember } from '../../../../../types/dso'
import { getImgUrl } from '../../../../../helpers/httpRequests'
import storageHelper from '../../../../../helpers/storageHelper'
import { noop } from 'lodash'
import EditableField from '../../../../../components/form/editable-field'
import EditableWysiwyg from '../../../../../components/form/editable-wysiwyg'

const useStyles = makeStyles(() => ({
  photo: {
    height: '272px',
    width: '272px',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    backgroundSize: 'cover',
    marginRight: '18px'
  }
}))

interface TeamMemberProps {
  member: DsoTeamMember
  index: number
  editMode?: boolean
  dsoId: string
}

const TeamMember = ({ member, editMode = false, dsoId, index }: TeamMemberProps) => {
  const classes = useStyles()
  const remove = () => console.log('must remove')

  const [imgUrl, setImgUrl] = useState('')

  const setPhoto = useCallback((id = '') => {
    (async (id = '') => {
      const x = await getImgUrl(
        editMode
          ? `/dataroom/raw/${storageHelper.getUserId()}/${id || ''}`
          : `/issuance/dso/dataroom/photos/raw/${dsoId}/${id}`
      )

      setImgUrl(x)
    })(id).then(noop).catch(noop)
  }, [dsoId, editMode])

  useEffect(() => {
    setPhoto(member.photo ?? '')
  }, [setPhoto, member.photo])

  return (
    <Box pt={4} px={4} pb={2} style={{ borderBottom: '1px solid #f0f0f0' }}>
      {editMode && (
        <Box style={{ textAlign: 'right' }}>
          <Button onClick={() => remove()}>
            <RemoveIcon /> Remove
          </Button>
        </Box>
      )}
      <Box style={{ display: 'flex' }}>
        <Box mr={2}>
          <div
            className={classes.photo}
            style={{
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              margin: '0 auto'
            }}
          />
          <input
            type='text'
            style={{ opacity: 0, width: 1, height: 1, position: 'absolute' }}
            name={`team[${index}].photo`}
            defaultValue={member.photo}
          />
          {editMode && (
            <span>uploader here</span>
            /* <Uploader
              document={{
                title: `Photo ${index}`,
                label: 'team member photo',
                type: 'teamMemberPhoto'
              }}
              showTitle={false}
              editMode={editMode}
              justify="center"
              onUpload={onDataroomDocumentUploaded}
            /> */
          )}
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
                  editMode={editMode}
                  label='Name'
                  value={member.name}
                  name={`team[${index}].name`}
                  previewMode={<Typography variant='h5'>{member.name}</Typography>}
                />
                <EditableField
                  editMode={editMode}
                  label='Position'
                  value={member.position}
                  name={`team[${index}].position`}
                  previewMode={(
                    <Typography>
                      <b>{member.position}</b>
                    </Typography>
                  )}
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
                value={member.about || 'About the member'}
                name={`team[${index}].about`}
                editMode={editMode}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TeamMember
