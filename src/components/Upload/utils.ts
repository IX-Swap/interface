import { FileWithPath } from 'file-selector'

import { FileTypes } from './types'

export const getfileType = (file?: FileWithPath | null): FileTypes => {
  const fileType = String(file?.type).split('/')[0]
  if (fileType === 'audio') {
    return FileTypes.AUDIO
  }
  if (fileType === 'video') {
    return FileTypes.VIDEO
  }
  if (fileType === 'image') {
    return FileTypes.IMAGE
  }
  return FileTypes.OTHER
}
