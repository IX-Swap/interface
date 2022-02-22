import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import apiService from 'services/apiService'
import { kyc } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { BROKER_DEALERS_STATUS } from 'state/brokerDealer/hooks'
import { fetchCreateIndividualKYC } from './actions'

export function useKYCState() {
  return useSelector<AppState, AppState['kyc']>((state) => state.kyc)
}

export const createIndividualKYC = async (newKYC: any) => {
  const formData = new FormData()

  for (const key in newKYC) {
    formData.append(key, newKYC[key])
  }

  try {
    const result = await apiService.post(kyc.createIndividual, formData)
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export function useCreateIndividualKYC() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (newKYC: any) => {
      try {
        dispatch(fetchCreateIndividualKYC.pending())
        const data = await createIndividualKYC(newKYC)
        dispatch(fetchCreateIndividualKYC.fulfilled({ data }))
        return BROKER_DEALERS_STATUS.SUCCESS
      } catch (error: any) {
        dispatch(fetchCreateIndividualKYC.rejected({ errorMessage: 'Could not create individual kyc' }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}
