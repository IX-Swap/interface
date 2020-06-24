import { snackbarService } from 'uno-material-ui'
import { getRequest, postRequest } from 'services/httpRequests'

export async function uploadFile (payload: {
  title: string,
  type: string,
  file: any,
}) {
  /**
   * saveFile requires the following params in payload
   * @param String title
   * @param String type
   * @param String file
   * @param Enum type Identity/Individual | Identity/Corporate
   * @param String id individal document id or corporate document id
   */

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

    throw new Error(response.message)
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Upload failed.'
    throw new Error(errMsg)
  }
}

export const downloadByUri = async (uri: string) => {
  try {
    const result = await getRequest(uri)

    if (result.status === 200) {
      result.blob().then((blob) => {
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
