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

export enum AcceptFiles {
  IMAGE = 'image/*',
  FILLES = 'image/*,video/*,audio/*',
  ALL = 'image/*,video/*,audio/*,webgl/*,.glb,.gltf',
}
