import { getRequest, postRequest, deleteRequest } from 'v1/services/httpRequests'
import { snackbarService } from 'uno-material-ui'

export async function uploadFile (payload: {
  title: string,
  type: string,
  file: any
}) {
  const { title, file, type } = payload
  try {
    const formData = new FormData()

    formData.append('title', title)
    formData.append('documents', file)
    formData.append('type', type)

    const uri = '/dataroom'
    const result = await postRequest(uri, formData)

    const response = await result.json()
    if (result.status === 200) {
      const data = response.data[0]

      return data
    }

    return undefined
  } catch (err) {
    return undefined
  }
}

export const downloadFile = async documentId => {
  try {
    const uri = `/issuance/dso/dataroom/subscription/raw/${documentId}`
    const result = await getRequest(uri)

    if (result.status === 200) {
      result.blob().then(blob => {
        const url = window.URL.createObjectURL(blob)
        window.open(url)
      })
      return
    }

    snackbarService.showSnackbar('Download failed', 'error')
  } catch (err) {
    snackbarService.showSnackbar('Download failed', 'error')
  }
}

export const deleteFile = async (userId, documentId) => {
  try {
    const uri = `/dataroom/${userId}/${documentId}`
    await deleteRequest(uri)
  } catch (err) {
    // empty catch
  }
}
