import axios from 'axios'

export const extractDocType = (docName: any) => docName?.substring(docName.lastIndexOf('.')).split('.')[1]

export const downloadFile = async (url: string, name: string, type: string) => {
  const link = document.createElement('a')
  const { data } = (await axios(url, {
    responseType: 'blob',
  })) as any

  const blob = new Blob([data], { type })

  link.download = name
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const downloadLocalFile = async (file: File) => {
  const link = document.createElement('a')
  const blob = new Blob([file], { type: file.type })

  link.download = file.name
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const isPreview = (docName?: string) => {
  const docType = extractDocType(docName)

  return !['docx', 'doc'].includes(docType)
}
export const isDownload = (docName: string) => {
  const docType = extractDocType(docName)

  return ['docx', 'doc'].includes(docType)
}
