import { DataroomFile } from 'types/dataroomFile'

export const getDataroomFileId = (file: any) => {
  if (file === undefined || file === null) {
    return ''
  }

  if (typeof file === 'string') {
    return file
  }

  if (Array.isArray(file)) {
    return file[0]._id
  }

  if ('fileument' in file) {
    return file.fileument?._id ?? ''
  }

  return file._id
}

export const isDocument = (
  value: DataroomFile | null | undefined
): value is DataroomFile => {
  return value !== null && value !== undefined && value?._id?.length > 0
}

export interface SelectedDocument {
  id: string
  index: number
}

export const itemComparator = (a: SelectedDocument, b: SelectedDocument) => {
  return a.id === b.id
}
