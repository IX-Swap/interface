/* global fetch, FormData, File */
import { API_URL } from '../config'
import localStore from './storageHelper'
import { snackbarService } from 'uno-material-ui'
import { DocumentGuide, Document } from '../types/document'

export const postRequest = async (uri: string, payload: any) => {
  const bearerToken = localStore.getAccessToken()
  const result = await fetch(API_URL + uri, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      ...(payload instanceof FormData
        ? {}
        : { 'Content-Type': 'application/json' })
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: payload instanceof FormData ? payload : JSON.stringify(payload)
  })

  return result
}

export const getRequest = async (uri: string) => {
  const bearerToken = localStore.getAccessToken()
  const result = await fetch(API_URL + uri, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer' // no-referrer, *client
  })

  return result
}

export const deleteRequest = async (uri: string, payload: any) => {
  const bearerToken = localStore.getAccessToken()
  const result = await fetch(API_URL + uri, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(payload)
  })

  return result
}

export const putRequest = async (uri: string, payload: any) => {
  const bearerToken = localStore.getAccessToken()
  const result = await fetch(API_URL + uri, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(payload)
  })

  return result
}

export const downloadFile = async (uri: string) => {
  try {
    const result = await getRequest(uri)

    if (result.status === 200) {
      const blob = await result.blob()
      const url = window.URL.createObjectURL(blob)
      window.open(url)
      return
    }

    await snackbarService.showSnackbar('Download failed', 'error')
  } catch (err) {
    console.log(err)
    await snackbarService.showSnackbar('Download failed', 'error')
  }
}

export const uploadFile = async (
  file: File,
  guide: DocumentGuide
): Promise<Document | undefined> => {
  const { title, type } = guide
  try {
    const formData = new FormData()

    formData.append('title', title)
    formData.append('documents', file)
    formData.append('type', type)

    const uri = '/dataroom'
    const result = await postRequest(uri, formData)

    const response = await result.json()
    if (result.status === 200) {
      const data = response.data[0]

      return data
    }

    return undefined
  } catch (err) {
    return undefined
  }
}

export const getImgUrl = async (uri: string): Promise<string> => {
  const response = await getRequest(uri)
  const buffer = await response.arrayBuffer()
  const arrayBufferToBase64 = (mBuffer: ArrayBuffer) => {
    let binary = ''
    const bytes = [].slice.call(new Uint8Array(mBuffer))

    bytes.forEach((b) => (binary += String.fromCharCode(b)))

    return window.btoa(binary)
  }

  const base64Flag = `data:${response.headers.get('content-type') ?? ''};base64,`
  const imageStr = arrayBufferToBase64(buffer)

  return base64Flag + imageStr
}
