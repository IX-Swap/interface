import fetch from 'node-fetch'
import { baseCreds } from './creds'
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
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: baseCreds.URL
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
    return register
  } catch (error) {
    console.log(error)
    throw new Error(`Company registration by API failed`)
  }
}
