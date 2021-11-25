export enum FileTypes {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  EMPTY = 'empty',
  OTHER = 'other',
}

export const commonFileTypes: Array<FileTypes | string | undefined> = [
  FileTypes.IMAGE,
  FileTypes.VIDEO,
  FileTypes.AUDIO,
]
