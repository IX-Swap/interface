import { useCallback } from 'react'

import { useFaucetContract } from 'hooks/useContract'

export const useDistributeToken = (tokenAddress: string) => {
  const faucetContract = useFaucetContract(tokenAddress)

  return useCallback(async () => {
    if (faucetContract) {
      const { _hex } = await faucetContract.timeToFaucet()
      const minutesToWait = Math.ceil(parseInt(_hex, 16) / 60)
      if (minutesToWait !== 0) return { transaction: null, minutesToWait }

      const result = await faucetContract.faucet({
        gasLimit: 900000,
      })
      const transaction = await result.wait()

      return { transaction, minutesToWait }
    }
  }, [faucetContract])
}
