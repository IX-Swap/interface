import React from 'react'
import { DataroomUploaderRenderProps } from 'v2/components/dataroom/DataroomUploader'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'
import { Avatar, Box } from '@material-ui/core'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { getDataroomFileId } from 'v2/helpers/dataroom'
import { Image, Person, PhotoCamera } from '@material-ui/icons'
import { useStyles } from 'v2/components/dataroom/DataroomAvatarUploader.styles'
import { useFormError } from 'v2/hooks/useFormError'
import { themeColors } from 'v2/themes/default'

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
