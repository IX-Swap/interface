import React from 'react'
import { Avatar, Box } from '@material-ui/core'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'

export interface DSOAvatarProps {
  imageId: string
  dsoOwnerId: string | undefined
  button?: JSX.Element
  size?: number
  variant?: 'circle' | 'rounded' | 'square'
}

export const DSOAvatar = (props: DSOAvatarProps) => {
  const { button, imageId, dsoOwnerId, size = 50, variant = 'circle' } = props

  return (
    <Box style={{ position: 'relative' }}>
      {imageId === undefined ? (
        <Avatar
          variant={variant}
          alt='avatar'
          style={{ width: size, height: size }}
        />
      ) : (
        <ViewDocument documentId={imageId} ownerId={dsoOwnerId ?? ''}>
          {url => (
            <Avatar
              src={url}
              variant={variant}
              alt='avatar'
              style={{ width: size, height: size }}
            />
          )}
        </ViewDocument>
      )}

      <Box
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
          opacity: 0.75
        }}
      >
        {button}
      </Box>
    </Box>
  )
}
