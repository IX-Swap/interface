import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { useErc20Contract } from './useContract'
import { useActiveWeb3React } from './web3'

export const useCryptoBalance = (tokenAddress?: string) => {
  const contract = useErc20Contract(tokenAddress)
  const { account } = useActiveWeb3React()
  const [balance, setBalance] = useState(0)
  const fetchBalance = useCallback(async () => {
    if (account === undefined || account === null) {
      return 0
    }
    const rawBalance = await contract?.balanceOf(account)
    const value = parseFloat(ethers.utils.formatUnits(rawBalance ?? 0, 0))
    setBalance(value)
  }, [contract, account])

  useEffect(() => {
    async function fetch() {
      await fetchBalance()
    }
    fetch().catch(error => console.error(error))
  }, [fetchBalance])
  return balance
}
