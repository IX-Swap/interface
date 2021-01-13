import React from 'react'
import { ViewDocument } from 'app/components/DSO/components/ViewDocument'
import { Avatar as MUIAvatar } from '@material-ui/core'

export interface AvatarProps {
  documentId?: string
  ownerId?: string
  size?: number | [number, number]
  variant?: 'circle' | 'rounded' | 'square'
  fallback?: Element | JSX.Element
}

export const Avatar = (props: AvatarProps) => {
  const { documentId, ownerId, size = 80, variant = 'circle', fallback } = props
  const width = Array.isArray(size) ? size[0] : size
  const height = Array.isArray(size) ? size[1] : size
  const style = { width, height }

  if (documentId === undefined || ownerId === undefined) {
    return (
      <>
        {fallback ?? (
          <MUIAvatar src={undefined} style={style} variant={variant} />
        )}
      </>
    )
  }

  return (
    <ViewDocument documentId={documentId} ownerId={ownerId}>
      {url =>
        url !== '' ? (
          <MUIAvatar src={url} style={style} variant={variant} />
        ) : (
          <></>
        )
      }
    </ViewDocument>
  )
}
