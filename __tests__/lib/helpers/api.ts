import fetch from 'node-fetch'
import { baseCreds } from './creds'
const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Origin: baseCreds.URL
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
    const cookies = await fetch(`${baseCreds.BASE_API}auth/sign-in`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(user)
    }).then(res => res.headers.raw()['set-cookie'])
    return cookies
  } catch (error) {
    console.log(error)
    throw new Error(`Get cookies by API failed`)
  }
}
