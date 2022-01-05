import fetch from 'node-fetch'
import { baseCreds } from './creds'

const defaultHeaders = {
  Connection: 'keep-alive',
  'Content-Type': 'application/json',
  'Accept-Encoding': 'gzip, deflate, br',
  'Content-Length': '352',
  Accept: '*/*',
  host: 'api.staging.mozork.com'
}
export async function userRegistration(email) {
  try {
    // Registration company
    const user = {
      name: 'Fredericka Erickson',
      email: email,
      password: baseCreds.PASSWORD
    }
    const register = await fetch(`${baseCreds.BASE_API}auth/registrations`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(user)
    }).then(res => res.json())
    return register
  } catch (error) {
    console.log(error)
    throw new Error(`Company registration by API failed`)
  }
}

export async function getCookies(email) {
  try {
    // Registration company
    const user = {
      email: email,
      password: baseCreds.PASSWORD
    }
    const request = await fetch(`${baseCreds.BASE_API}auth/sign-in`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(user)
    })
    const cookies = request.headers.raw()['set-cookie']
    return { cookies, request }
  } catch (error) {
    console.log(error)
    throw new Error(`Get cookies by API failed`)
  }
}

export async function postRequest(body, cookies, link, method = 'POST') {
  try {
    // Registration company
    const request = await fetch(baseCreds.BASE_API + link, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        Accept: '*/*',
        host: 'api.staging.mozork.com',
        Cookie: cookies
      }
    })
    if (request.status !== 200) {
      console.log(request)
      throw new Error(`Post request by API failed: ${request.statusText}`)
    }
    return request
  } catch (error) {
    console.log(error)
    throw new Error(`Post request by API failed`)
  }
}
