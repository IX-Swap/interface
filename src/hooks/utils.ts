import { AxiosResponse } from 'axios'
import { BlobWithExtension, PaginatedData } from 'services/api/types'

export const convertPaginatedResultToFlatArray = <DataType = any>(
  pages: Array<AxiosResponse<PaginatedData<DataType>>>
): DataType[] => {
  return pages
    .filter(page => page !== undefined)
    .map(page =>
      page.data.reduce<DataType[]>((acc, cur) => [...acc, ...cur.documents], [])
    )
    .flat()
}

export const convertDataArrayToMap = <T>(
  key: keyof T,
  data: T[]
): Record<keyof T, T> => {
  return data.reduce<any>(
    (acc, cur) => ({
      ...acc,
      [cur[key] as unknown as string]: cur
    }),
    {}
  )
}

export const convertBlobToFile = (blob: Blob, filename?: string) => {
  return new File([blob], filename ?? '', { type: blob.type }) // TODO: fix file name
}

export const getBlobFromResponse = (
  data: AxiosResponse<any>
): BlobWithExtension => {
  const { response } = data.request
  const objectResponse = JSON.parse(response)
  const blob = new Blob([new Uint8Array(objectResponse?.file?.data)], {
    type: objectResponse?.extension
  })
  return {
    blob,
    extension: objectResponse?.extension
  }
}

export const downloadByAnchor = (data: BlobWithExtension, name: string) => {
  const url = URL.createObjectURL(data.blob)
  const download = `${name}.${data?.extension ?? 'txt'}`
  downloadObjectURL(url, download)
}

export const downloadObjectURL = (url: string, name: string) => {
  const link = document.createElement('a')
  link.download = name
  link.href = url
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const createObjectURLFromFile = (file: File) => {
  return window.URL.createObjectURL(file)
}

export const downloadByFile = (file: File, name: string) => {
  const url = createObjectURLFromFile(file)
  downloadObjectURL(url, name)
}

export const revokeObjectURL = (url: string) => {
  return window.URL.revokeObjectURL(url)
}

export const openFileInNewTab = (file: File) => {
  const url = createObjectURLFromFile(file)
  window.open(url)
}

export const generateSingPassAuthorizeUrl = () => {
  const url = process.env.SING_PASS_AUTH_URL ?? ''
  const clientId = process.env.SING_PASS_CLIENT_ID ?? ''
  const purpose = 'identification'
  const state = encodeURIComponent('123')
  const redirectUrl = process.env.SING_PASS_REDIRECT_URL ?? ''
  const attributes = process.env.SING_PASS_ATTRIBUTES ?? ''

  return `${url}?client_id=${clientId}&attributes=${attributes}&purpose=${purpose}&state=${state}&redirect_uri=${redirectUrl}`
}
