import React, { Fragment, ReactNode } from 'react'
import { ViewDocument } from 'app/components/DSO/components/ViewDocument'
import { Avatar, AvatarProps, Badge, BadgeProps } from '@mui/material'
import { useRawBanner } from 'app/pages/admin/hooks/useRawBanner'
import { useTheme } from '@mui/styles'

export interface CustomAvatarProps extends AvatarProps {
  documentId?: string
  ownerId?: string
  type?: 'banner' | 'document'
  size?: number | [number, number] | [string, string]
  border?: string | number
  borderRadius?: string | number
  maxWidth?: number | string
  fallback?: Element | JSX.Element
  children?: ReactNode
  hasBadge?: boolean
}

export const CustomAvatar = (props: CustomAvatarProps) => {
  const {
    documentId,
    ownerId = '',
    type = 'document',
    size = 80,
    variant = 'circular',
    fallback,
    children,
    maxWidth = 'initial',
    hasBadge = false,
    src
  } = props
  const width = Array.isArray(size) ? size[0] : size
  const height = Array.isArray(size) ? size[1] : size

  const style = { width, height, maxWidth }

  const StyledBadge = (props: BadgeProps) => {
    const { palette } = useTheme()
    return (
      <Badge
        {...props}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: palette.success.main,
            color: palette.success.main,
            '&::after': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              content: '""'
            }
          }
        }}
      />
    )
  }

  const Wrapper = hasBadge ? StyledBadge : Fragment

  const fallbackElement = (
    <Wrapper
      overlap='circular'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant='dot'
    >
      {fallback ?? (
        <Avatar src={src} style={style} variant={variant}>
          {children}
        </Avatar>
      )}
    </Wrapper>
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
          <Wrapper
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant='dot'
          >
            <Avatar src={url} style={style} variant={variant}>
              {children}
            </Avatar>
          </Wrapper>
        ) : (
          fallbackElement
        )
      }
    </ViewDocument>
  )
}
