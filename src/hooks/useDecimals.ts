import { useState, useEffect } from 'react';
import { useTokenContract } from './useContract';

function useDecimals(tokenAddress: string | undefined) {
  const tokenContract = useTokenContract(tokenAddress)

  const [decimals, setDecimals] = useState<number | null | undefined>(null);

  useEffect(() => {
    if (!tokenAddress) return;

    async function fetchDecimals() {
      try {
        const decimals = await tokenContract?.decimals();
        setDecimals(decimals);
      } catch (err: any) {
        console.error(`Failed to fetch decimals for token ${tokenAddress}`, err);
      }
    }

    if ( tokenAddress && tokenContract) {
      fetchDecimals();
    }
  }, [tokenAddress]);

  return decimals;
}

export default useDecimals;