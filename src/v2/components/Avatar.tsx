import React from 'react'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'
import { Avatar as MUIAvatar } from '@material-ui/core'

export interface AvatarProps {
  documentId: string
  ownerId: string
  size?: number
  variant?: 'circle' | 'rounded' | 'square'
}

export const Avatar = (props: AvatarProps) => {
  const { documentId, ownerId, size = 80, variant = 'circle' } = props

  return (
    <ViewDocument documentId={documentId} ownerId={ownerId}>
      {url => (
        <MUIAvatar
          src={url}
          style={{ width: size, height: size }}
          variant={variant}
        />
      )}
    </ViewDocument>
  )
}
