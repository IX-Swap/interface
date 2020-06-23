/* global fetch FormData */
// @flow
import { API_URL } from 'config'
import localStore from './storageHelper'

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

export const getImgUrl = async (uri: string) => {
  const response = await getRequest(uri)
  const buffer = await response.arrayBuffer()
  const arrayBufferToBase64 = (mBuffer) => {
    let binary = ''
    const bytes = [].slice.call(new Uint8Array(mBuffer))

    bytes.forEach((b) => (binary += String.fromCharCode(b)))

    return window.btoa(binary)
  }

  const base64Flag = `data:${response.headers['content-type']};base64,`
  const imageStr = arrayBufferToBase64(buffer)

  return base64Flag + imageStr
}
