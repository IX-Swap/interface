import React, { Fragment, ReactNode } from 'react'
import { ViewDocument } from 'app/components/DSO/components/ViewDocument'
import { Avatar as MUIAvatar } from '@material-ui/core'

export interface AvatarProps {
  documentId?: string
  ownerId?: string
  size?: number | [number, number] | [string, string]
  variant?: 'circle' | 'rounded' | 'square'
  fallback?: Element | JSX.Element
  children?: ReactNode
  isNewThemeOn?: boolean
  isSmallPreview?: boolean
}

export const Avatar = (props: AvatarProps) => {
  const {
    documentId,
    ownerId,
    size = 80,
    variant = 'circle',
    fallback,
    children,
    isNewThemeOn = false,
    isSmallPreview = false
  } = props
  const width = Array.isArray(size) ? size[0] : size
  const height = Array.isArray(size) ? size[1] : size
  const borderRadius = isNewThemeOn && isSmallPreview ? 4 : 'initial'
  const border =
    isNewThemeOn && isSmallPreview ? ' 1px solid #AAAAAA' : 'initial'
  const style = { width, height, border, borderRadius }

  const fallbackElement = (
    <Fragment>
      {fallback ?? (
        <MUIAvatar src={undefined} style={style} variant={variant}>
          {children}
        </MUIAvatar>
      )}
    </Fragment>
  )

  if (documentId === undefined || ownerId === undefined || documentId === '') {
    return fallbackElement
  }

  return (
    <ViewDocument
      documentId={documentId}
      ownerId={ownerId}
      isNewThemeOn={isNewThemeOn}
    >
      {url =>
        url !== '' ? (
          <MUIAvatar src={url} style={style} variant={variant}>
            {children}
          </MUIAvatar>
        ) : (
          fallbackElement
        )
      }
    </ViewDocument>
  )
}
