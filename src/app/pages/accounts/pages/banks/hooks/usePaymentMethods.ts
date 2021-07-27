import { UseQueryData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'
import { hasValue } from 'helpers/forms'

export interface PaymentMethods {
  method: string
  name: string
}

export const usePaymentMethod = (
  country: string,
  switftCode: string
): UseQueryData<PaymentMethods> => {
  const { apiService } = useServices()

  const uri = accountsURL.virtualAccounts.getPaymentMethods(country, switftCode)
  const getPaymentMethods = async () => {
    return await apiService.get<PaymentMethods>(uri)
  }

  const { data, ...rest } = useQuery(
    [virtualAccountQueryKeys.paymentMethod, country, switftCode],
    getPaymentMethods,
    {
      enabled: hasValue(country) && hasValue(switftCode)
    }
  )

  return {
    ...rest,
    data: data?.data
  }
}
