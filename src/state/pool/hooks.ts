/* eslint-disable react-hooks/rules-of-hooks */
import { Contract } from 'ethers'
import { usePairContract } from 'hooks/useContract'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { isExternal } from 'util/types'
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

export const useMitigationEnabled = (liquidityAddress?: string) => {
  const pairContract: Contract | null = usePairContract(liquidityAddress)
  const [mitigationEnabled, setMitigationEnabled] = useState(false)

  const checkMitigation = useCallback(async () => {
    if (!pairContract) {
      return false
    }
    const isEnabled = await pairContract.mitigationEnabled()
    return isEnabled
  }, [pairContract])

  useEffect(() => {
    async function check() {
      const result = await checkMitigation()
      setMitigationEnabled(result)
    }
    check()
  }, [checkMitigation])
  return mitigationEnabled
}
