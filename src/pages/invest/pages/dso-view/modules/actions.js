//
import { getRequest } from 'services/httpRequests'

// TODO: Move to another place for reusability
export const downloadFile = async (dsoId, document) => {
  const { _id } = document

  const uri = `/issuance/dso/dataroom/documents/raw/${dsoId}/${_id}`
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
