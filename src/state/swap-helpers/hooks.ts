import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { BrokerDealerSwapDto, saveBrokerDealerDto } from './actions'

export function useSwapHelpersState(): AppState['swapHelper'] {
  const data = useSelector<AppState, AppState['swapHelper']>((state) => state.swapHelper)
  return data
}

export function useSaveBrokerDealerDto() {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((dto: BrokerDealerSwapDto) => {
    dispatch(saveBrokerDealerDto({ dto }))
  }, [])
}

export function useSubmitBrokerDealerForm(ref: any) {
  const { dto } = useSwapHelpersState()
  useEffect(() => {
    const submitForm = () => {
      if (ref.current) {
        console.log({ ref })
        ref.current.submit()
      }
    }
    if (dto) {
      submitForm()
    }
  }, [dto])
  return { dto }
}
