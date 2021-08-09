import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
// import { DownloadDocument } from 'hooks/useDownloadRawDocument'
import { bannersQueryKeys } from 'config/queryKeys'
import { bannerURL } from 'config/apiURL'

export const useRawBanner = (bannerId: string) => {
  const { apiService } = useServices()
  // const url = useDataroomFileURL(document.documentId, document.ownerId)
  const url = bannerURL.getRowBanner(bannerId)
  const downloadFile = async () => {
    return await apiService.get<Blob>(url, { responseType: 'blob' })
  }

  return useQuery([bannersQueryKeys.getById, bannerId], downloadFile)
}
