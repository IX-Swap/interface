import { useCallback, useState } from 'react'
import useAddToMetamask from './useAddToMetamask'

export interface UseAddTokenByDetailsToMetamaskArgs {
  address: string
  symbol?: string
  decimals?: number
  image?: string
}
export default function useAddTokenByDetailsToMetamask(): {
  addToken: (args: UseAddTokenByDetailsToMetamaskArgs) => void
  success: boolean | undefined
} {
  const [success, setSuccess] = useState<boolean | undefined>()
  const addToMetamask = useAddToMetamask()
  const addToken = useCallback(
    (args: UseAddTokenByDetailsToMetamaskArgs) => {
      addToMetamask({ ...args, onSuccess: setSuccess })
    },
    [addToMetamask]
  )

  return { addToken, success }
}
