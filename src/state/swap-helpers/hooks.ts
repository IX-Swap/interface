import { useCallback, useEffect, useRef } from 'react'
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

export function useSubmitBrokerDealerForm() {
  const { dto } = useSwapHelpersState()
  const formRef = useRef() as any

  useEffect(() => {
    const submitForm = () => {
      if (formRef.current) {
        console.log({ formRef })
        console.log({ dto })
        formRef.current.submit()
      }
    }
    if (dto) {
      submitForm()
    }
  }, [dto])
  return { dto, formRef }
}
