
import { apiUrl } from './config'

export async function postRequest (uri, payload) {
  const bearerToken = localStorage.getItem('id_token')
  return await fetch(apiUrl + uri, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(payload)
  })
}

export async function getRequest (uri) {
  const bearerToken = localStorage.getItem('id_token')
  return await fetch(apiUrl + uri, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer' // no-referrer, *client
  })
}

export async function deleteRequest (uri, payload) {
  const bearerToken = localStorage.getItem('id_token')
  return await fetch(apiUrl + uri, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(payload)
  })
}