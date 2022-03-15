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
  ALL = 'image/*,video/*,audio/*,webgl/*,.glb,.gltf,application/pdf,/.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  DOCUMENTS = 'application/pdf,/.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  FILLES = 'image/*,video/*,audio/*',
}
