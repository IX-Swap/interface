//
import { postRequest, getRequest } from 'services/httpRequests'

import localStore from 'services/storageHelper'

// TODO: Move to another place for reusability
export const downloadFile = async document => {
  const { user, _id } = document

  const uri = `/dataroom/raw/${user}/${_id}`
  const result = await getRequest(uri)

  if (result.status === 200) {
    result.blob().then(blob => {
      const url = window.URL.createObjectURL(blob)
      window.open(url)
    })
  } else {
    throw new Error('Download Failed.')
  }
}

export const saveIssuance = async payload => {
  const uri = `/issuance/dso/${localStore.getUserId()}`

  try {
    const res = await postRequest(uri, payload)

    if (res.status !== 200) return undefined

    const { data } = await res.json()

    return data
  } catch (e) {
    return undefined
  }
}
