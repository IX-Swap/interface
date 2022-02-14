import React from 'react'
import { DataroomUploaderRenderProps } from 'components/dataroom/DataroomUploader'
import { ViewDocument } from 'app/components/DSO/components/ViewDocument'
import { Avatar, Box } from '@material-ui/core'
import { useAuth } from 'hooks/auth/useAuth'
import { getDataroomFileId } from 'helpers/dataroom'
import { Image, Person, PhotoCamera } from '@material-ui/icons'
import { useStyles } from 'components/dataroom/DataroomAvatarUploader.styles'
import { useFormError } from 'hooks/useFormError'
import { themeColors } from 'themes/old/colors'

export interface DataroomAvatarUploaderProps
  extends DataroomUploaderRenderProps {
  size?: number
  variant?: 'circle' | 'rounded' | 'square'
  type?: 'person' | 'image'
}

export const DataroomAvatarUploader = (props: DataroomAvatarUploaderProps) => {
  const {
    handleUpload,
    value,
    name,
    size = 60,
    variant = 'circle',
    type = 'person'
  } = props
  const { user } = useAuth()
  const photoId = getDataroomFileId(value)
  const { hasError } = useFormError(name)
  const style = { width: size, height: size }
  const containerStyle = {
    ...style,
    boxShadow: hasError ? `0 0 0 2px ${themeColors.error}` : 'none',
    borderRadius: size
  }
  const classes = useStyles()
  const isPerson = type === 'person'

  if (photoId === undefined || photoId === '' || user === undefined) {
    return (
      <Box
        className={classes.container}
        onClick={handleUpload}
        style={containerStyle}
      >
        <Box className={classes.overlay}>
          <PhotoCamera />
        </Box>
        <Avatar style={style} variant={variant}>
          {isPerson ? <Person /> : <Image />}
        </Avatar>
      </Box>
    )
  }

  return (
    <ViewDocument documentId={photoId} ownerId={user._id}>
      {url => (
        <Box
          className={classes.container}
          onClick={handleUpload}
          style={containerStyle}
        >
          <Box className={classes.overlay}>
            <PhotoCamera />
          </Box>
          <Avatar src={url ?? ''} style={style} variant={variant} />
        </Box>
      )}
    </ViewDocument>
  )
}
