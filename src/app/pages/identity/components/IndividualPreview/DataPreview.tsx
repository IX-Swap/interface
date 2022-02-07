import React from 'react'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { Avatar } from 'components/Avatar'
import { Box } from '@mui/material'
import { FieldsDisplay } from 'app/pages/identity/components/IndividualPreview/FieldDisplay'

export interface DataPreviewProps {
  avatar?: string
  userId?: string
  fields?: Array<{ key: string; value?: string }>
}

export const DataPreview = ({ avatar, userId, fields }: DataPreviewProps) => {
  const { isMobile } = useAppBreakpoints()

  return (
    <Box display='flex' flexDirection={isMobile ? 'column' : 'row'}>
      <Avatar
        documentId={avatar}
        ownerId={userId}
        variant='circular'
        size={96}
      />
      <Box p={3} />
      <FieldsDisplay fields={fields} />
    </Box>
  )
}
