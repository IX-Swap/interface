export interface IssuanceFile {
  id?: number
  file: File & { id: number }
}