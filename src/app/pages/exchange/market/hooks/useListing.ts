import { exchange as exchangeApiUrl } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { ListingView } from 'types/listing'

export const useListing = () => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { listingId } = useParams<{ listingId: string }>()

  const getListing = async () => {
    return await apiService.get<ListingView>(
      exchangeApiUrl.getListing(userId, listingId)
    )
  }

  const { data, ...rest } = useQuery(
    exchangeQueryKeys.listing(listingId),
    getListing
  )
  return { ...rest, data: data?.data }
}
