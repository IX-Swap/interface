import axios from 'axios'
import { FileWithPath } from 'react-dropzone'

export const createFileFromApi = async (file: any) => {
  if (file) {
    const name = file?.name
    const { data } = (await axios(file?.public, {
      responseType: 'blob',
    })) as any

    const newFile = new File([data], name, { type: file.mimeType, lastModified: new Date().getTime() })
    const blob = new Blob([data], { type: file.mimeType })
    const preview = URL.createObjectURL(newFile)
    const fileWithPath = newFile as FileWithPath
    return { link: file?.public, file: fileWithPath, blob, preview }
  }

  return null
}
