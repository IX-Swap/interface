/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { setPoolTransctionHash } from './actions'

export function getPoolTransactionHash(): null | string {
  return useSelector<AppState, null | string>((state) => state.pool.transactionHash)
}

export const setPoolTransactionHash = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (newState: string | null) => {
      dispatch(setPoolTransctionHash({ transactionHash: newState }))
    },
    [dispatch]
  )
}
