import React from 'react'
import { getIdFromObj } from 'helpers/strings'
import { Avatar } from 'components/Avatar'
import { DropzoneFallback } from 'components/dataroom/DropzoneFallback'
import { getDataroomFileId } from 'helpers/dataroom'
import { DataroomFile } from 'types/dataroomFile'
import { Maybe } from 'types/util'
import { useAuth } from 'hooks/auth/useAuth'

export interface DropzoneDisplayProps {
  multiple: boolean
  hasError: boolean
  value?: Maybe<DataroomFile | DataroomFile[]>
  size?: number | [number, number] | [string, string]
  type?: 'banner' | 'document'
}

export const DropzoneDisplay = ({
  multiple,
  hasError,
  value,
  size = 128,
  type = 'document'
}: DropzoneDisplayProps) => {
  const { user } = useAuth()

  return (
    <>
      {multiple ? (
        <DropzoneFallback hasError={hasError} multiple />
      ) : (
        <Avatar
          size={size}
          documentId={getDataroomFileId(value)}
          ownerId={getIdFromObj(user)}
          variant='square'
          type={type}
          fallback={<DropzoneFallback type={type} hasError={hasError} />}
        />
      )}
    </>
  )
}
