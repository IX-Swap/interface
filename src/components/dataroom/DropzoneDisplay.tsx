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
  previewSize?: number | [number, number] | [string, string]
  isNewThemeOn?: boolean
}

export const DropzoneDisplay = ({
  multiple,
  hasError,
  value,
  previewSize,
  isNewThemeOn = false
}: DropzoneDisplayProps) => {
  const { user } = useAuth()

  return (
    <>
      {multiple ? (
        <DropzoneFallback hasError={hasError} multiple />
      ) : (
        <Avatar
          size={previewSize !== undefined ? previewSize : 128}
          documentId={getDataroomFileId(value)}
          ownerId={getIdFromObj(user)}
          variant='square'
          isNewThemeOn={isNewThemeOn}
          fallback={
            <DropzoneFallback isNewThemeOn={isNewThemeOn} hasError={hasError} />
          }
        />
      )}
    </>
  )
}
