import { useFaucetContract } from 'hooks/useContract'
import { useCallback } from 'react'

export const useDistributeToken = (tokenAddress: string) => {
  const faucetContract = useFaucetContract(tokenAddress)

  return useCallback(async () => {
    if (faucetContract) {
      const result = await faucetContract.faucet({
        gasLimit: 900000,
      })
      const finished = await result.wait()
      console.log(finished, result)
    }
  }, [faucetContract])
}
