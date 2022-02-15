export enum DataroomFileType {
  image = 'image/jpg,image/jpeg,image/png,image/gif,image/tiff,image/webp,image/svg,image/apng,image/avif,image/jfif,image/pjpeg,image/pjp',
  document = 'image/jpg,image/jpeg,image/png,image/gif,image/tiff,image/webp,image/svg,image/apng,image/avif,image/jfif,image/pjpeg,image/pjp,.docx,.xlsx,.pdf,.odt,.txt,.csv',
  all = '*',
  report = '.xlsx,.pdf'
}

export enum DataroomDocumentType {
  SupportingDocument = 'Supporting Document',
  Other = 'Other'
}
