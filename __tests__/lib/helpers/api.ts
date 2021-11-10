import fetch from 'node-fetch'

export async function userRegistration(email) {
  try {
    // Registration company
    const user = {
      name: 'Fredericka Erickson',
      email: email,
      password: 'Pa$$w0rd!qwe'
    }
    const register = await fetch(
      `https://api.staging.mozork.com/auth/registrations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: 'https://staging.mozork.com/'
        },
        body: JSON.stringify(user)
      }
    ).then(res => res.json())
    return register
  } catch (error) {
    console.log(error)
    throw new Error(`Company registration by API failed`)
  }
}
