export interface DataroomFile {
  _id: string
  title: string
  type: string
  user: string
  originalFileName: string
  url?: string
  createdAt: string
  updatedAt: string
}
export interface FileGuide {
  title: string
  label: string
  type: string
}

export interface DataroomFileWithGuide extends FileGuide {
  document: DataroomFile
}

export interface FormArrayElement<T> {
  value: T
}

export type FormArray<T> = Array<FormArrayElement<T>>
