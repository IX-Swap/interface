import React, { Fragment, ReactNode } from 'react'
import { ViewDocument } from 'app/components/DSO/components/ViewDocument'
import {
  Avatar as MUIAvatar,
  AvatarProps as MUIAvatarProps
} from '@mui/material'
import { useRawBanner } from 'app/pages/admin/hooks/useRawBanner'

export interface AvatarProps extends MUIAvatarProps {
  documentId?: string
  ownerId?: string
  type?: 'banner' | 'document'
  size?: number | [number, number] | [string, string]
  border?: string | number
  borderRadius?: string | number
  maxWidth?: number | string
  fallback?: Element | JSX.Element
  children?: ReactNode
  imageValue?: boolean | null
  cursor?: string
}

export const Avatar = (props: AvatarProps) => {
  const {
    documentId,
    ownerId = '',
    type = 'document',
    size = 80,
    borderRadius = 'initial',
    border = 'initial',
    variant = 'circular',
    fallback,
    children,
    maxWidth = 'initial',
    imageValue,
    cursor = 'pointer'
  } = props
  const width = Array.isArray(size) ? size[0] : size
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const height = imageValue ? 200 : Array.isArray(size) ? size[1] : size

  const style = { width, height, border, borderRadius, maxWidth, cursor }

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
      type={type}
      getDataFunction={type === 'banner' ? useRawBanner : undefined}
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
