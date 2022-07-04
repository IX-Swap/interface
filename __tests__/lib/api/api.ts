import fetch from 'node-fetch'
import { baseCreds } from '../helpers/creds'

const fs = require('fs')
const util = require('util')
const streamPipeline = util.promisify(require('stream').pipeline)

const defaultHeaders = {
  Connection: 'keep-alive',
  'Content-Type': 'application/json',
  'Accept-Encoding': 'gzip, deflate, br',
  'Content-Length': '352',
  Accept: '*/*',
  host: baseCreds.HOST
}
export async function userRegistration(email, fullName = 'Fredericka Erickson') {
  try {
    // Registration company
    const user = {
      name: fullName,
      email: email,
      singPassLogin: false,
      oldEmail: 'no@email.com',
      oldMobileNo: 'no-old-mobile-no',
      password: 'Pa$$w0rd!qwe',
      accountType: 'INDIVIDUAL'
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
    // console.log(cookies)

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
        host: baseCreds.HOST,
        Cookie: cookies
      }
    })
    if (request.status !== 200) {
      console.log(await request.json())
      throw new Error(`Post request ${link} ${request.status}=  failed: `)
    }
    return request.json()
  } catch (error) {
    throw new Error(`Post request by API failed ${error}`)
  }
}
export async function getRequest(cookies, link) {
  try {
    // Registration company
    const request = await fetch(baseCreds.BASE_API + link, {
      method: 'GET',
      headers: {
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        Accept: '*/*',
        host: baseCreds.HOST,
        Cookie: cookies
      }
    }).then(request => request.json())
    return request
  } catch (error) {
    console.log(error)
    throw new Error(`GET request by API failed`)
  }
}

export async function getCookiesForAllAccounts(
  list = [baseCreds.firstExchange, baseCreds.secondExchange, baseCreds.thirdExchange]
) {
  let result = new Array()
  for (const item of list) {
    const cookie = await (await getCookies(item)).cookies
    result.push(cookie)
  }
  return result
}

export async function putRequest(cookies, link) {
  try {
    // Registration company
    const request = await fetch(baseCreds.BASE_API + link, {
      method: 'PUT',
      headers: {
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        Accept: '*/*',
        host: baseCreds.HOST,
        Cookie: cookies
      }
    })
    if (request.status !== 200) {
      console.log(await request.json())
      throw new Error(`Post request ${link} = failed: `)
    }
    return request
  } catch (error) {
    console.log(error)
    throw new Error(`PUT request by API failed`)
  }
}

export async function downloadMetamask(path) {
  const response = await fetch(
    'https://github.com/MetaMask/metamask-extension/releases/download/v10.15.0/metamask-chrome-10.15.0.zip'
  )
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
  await streamPipeline(response.body, fs.createWriteStream(path))
}
