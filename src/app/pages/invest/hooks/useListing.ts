import { exchange as exchangeApiUrl } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ListingView } from 'types/listing'

export const useListing = () => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const { listingId, userId } = useParams<{
    listingId: string
    userId?: string
  }>()
  const _userId = userId ?? getIdFromObj(user)

  const getListing = async () => {
    return await apiService.get<ListingView>(
      exchangeApiUrl.getListing(_userId, listingId)
    )
  }

  const { data, ...rest } = useQuery(
    exchangeQueryKeys.listing(listingId),
    getListing
  )
  return { ...rest, data: data?.data }
}
