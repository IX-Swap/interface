// @flow
import { getRequest } from 'services/httpRequests'
import type { Document } from 'context/dso/types'

// TODO: Move to another place for reusability
export const downloadFile = async (dsoId: string, document: Document) => {
  const { _id } = document

  const uri = `/issuance/dso/dataroom/documents/raw/${dsoId}/${_id}`
  const result = await getRequest(uri)

  if (result.status === 200) {
    result.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob)
      window.open(url)
    })
  } else {
    throw new Error('Download Failed.')
  }
}
