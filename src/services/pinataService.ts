import axios from 'axios'
import { PINATA_API_KEY, PINATA_SECRET_API_KEY } from 'config'
import { SupportedChainId } from 'constants/chains'
import { FileWithPath } from 'file-selector'
import { NumericTrait } from 'pages/CreateNFT/types'

export const endpoint = 'https://api.pinata.cloud'

const authHeaders = {
  pinata_api_key: PINATA_API_KEY,
  pinata_secret_api_key: PINATA_SECRET_API_KEY,
}
export interface KeyValues {
  description?: string
  link?: string
  attributes?: Array<any>
  isNSFW?: any
  selectedChain?: SupportedChainId
}
interface PinProps {
  file: FileWithPath
  name: string
  keyValues: KeyValues
}
export const pinFileToIPFS = async ({ file, name, keyValues }: PinProps) => {
  try {
    const formData = new FormData()
    const requestMeta = {
      maxContentLength: -1,
      headers: {
        ...authHeaders,
        path: file.path,
      },
    }
    const url = `${endpoint}/pinning/pinFileToIPFS`
    const metadata = JSON.stringify({
      name: name,
      keyvalues: {
        ...keyValues,
      },
    })
    formData.append('pinataMetadata', metadata)
    formData.append('file', file, file.name)
    const result = await axios.post(url, formData, requestMeta)
    return result?.data
  } catch (error: any) {
    throw new Error(error?.message ?? 'Something went wrong')
  }
}
