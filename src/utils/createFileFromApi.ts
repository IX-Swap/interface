import { FileWithPath } from 'react-dropzone'

export const createFileFromApi = async (file: any) => {
    if (file) {
        const name = file?.name
        const response = await fetch(file?.public)
        const blob = await response.blob()
        const newFile = new File([blob], name, { type: blob.type, lastModified: new Date().getTime() })
        const preview = URL.createObjectURL(newFile)
        const fileWithPath = newFile as FileWithPath
        return { link: file?.public, file: fileWithPath, blob, preview }
    }

    return null
}