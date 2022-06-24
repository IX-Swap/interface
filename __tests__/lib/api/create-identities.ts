import { postRequest, userRegistration, getCookies, putRequest } from './api'
import { randomString } from '../helpers/helpers'
import { text } from '../helpers/text'
import * as corporateBody from './corporate-identity'
import * as issuerBody from './issuer-identity'

import { Authentication } from '../page-objects/authentication'
import { baseCreds } from '../helpers/creds'
const confirmEmail = new Authentication('use')

export async function userRegistrationConfirmation2FA(email) {
  const userName = randomString() + ' Auto'
  //The user registration and confirmation flow
  await userRegistration(email, userName)
  const link = (await confirmEmail.confirmation(email)).split('=')
  await postRequest({ verificationToken: link[1] }, '', text.confirmEmail)
  // Get cookies and id
  const { cookies, request } = await getCookies(email)
  const id = (await request.json()).data._id
  await postRequest({}, cookies, `auth/2fa/setup/${id}`, 'POST')
  await postRequest({}, cookies, `auth/2fa/setup/${id}/confirm/111111`, 'POST')
  return { id, cookies, userName }
}
export async function createIdentity(email, identityType, identityForms) {
  const { id, cookies, userName } = await userRegistrationConfirmation2FA(email)
  // Fill all form by API
  let submitId

  for (const [title, dict] of Object.entries(identityForms)) {
    try {
      submitId = (await postRequest(dict, cookies, `identity/${identityType}/${id}`, 'PUT')).data._id
    } catch (error) {
      console.log(error)
      throw new Error(`Error submitting ${title} form`)
    }
  }

  // Submit form
  await postRequest({}, cookies, `identity/${identityType}/${submitId}/submit`, 'PATCH')
  return { id, submitId, userName, email }
}

export async function createCorporateIdentity(email, identityType, identityForms) {
  const { id, cookies, userName } = await userRegistrationConfirmation2FA(email)

  // Fill all form by API
  const submitId = (
    await postRequest(corporateBody.corporateInformation, cookies, `identity/${identityType}/${id}`, 'POST')
  ).data._id
  await postRequest(corporateBody.financialInformation, cookies, `identity/${identityType}/${id}/${submitId}`, 'PUT')
  await postRequest(corporateBody.taxDeclaration, cookies, `identity/${identityType}/${id}/${submitId}`, 'PUT')
  await postRequest(
    corporateBody.investorStatusDeclaration,
    cookies,
    `identity/${identityType}/${id}/${submitId}`,
    'PUT'
  )
  await postRequest(corporateBody.docs, cookies, `identity/${identityType}/${id}/${submitId}`, 'PUT')
  // Submit form
  await postRequest({}, cookies, `identity/${identityType}/${submitId}/submit`, 'PATCH')
  return { id, submitId, userName, email }
}

export async function createIssuerIdentity(email, identityType) {
  const { id, cookies, userName } = await userRegistrationConfirmation2FA(email)

  // Fill all form by API
  const submitId = (await postRequest(issuerBody.issuerDetails, cookies, `identity/${identityType}/${id}`, 'POST')).data
    ._id
  await postRequest(issuerBody.docsIssuer, cookies, `identity/${identityType}/${id}/${submitId}`, 'PUT')

  // Submit form
  await postRequest({}, cookies, `identity/${identityType}/${submitId}/submit`, 'PATCH')
  return { id, submitId, userName, email }
}

export async function approveIdentity(id, identityType) {
  const cookies = await getCookies(baseCreds.AUTHORIZER_USER)
  await putRequest(cookies.cookies, `identity/${identityType}/${id}/approve`)
}

export async function rejectIdentity(id, identityType) {
  const cookies = await getCookies(baseCreds.AUTHORIZER_USER)
  await putRequest(cookies.cookies, `identity/${identityType}/${id}/reject`)
}
