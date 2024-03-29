import { useCallback } from 'react'

import apiService from 'services/apiService'
import { metamask } from 'services/apiUrls'

import { login } from './login'
import { sign } from './personalSign'
import { useWeb3React } from '@web3-react/core'

/* eslint-disable react/display-name */

interface Hash {
  hash: string
}
export const useFetchToken = () => {
  const { account, provider } = useWeb3React()

  // const fetchToken = useCallback(async () => {
  //   if (!account) {
  //     throw new Error("User didn't connect a wallet")
  //   }
  //   const { data } = await apiService.post<Hash>(metamask.challenge, { address: account })
  //   if (!data.hash) {
  //     throw new Error('No hash received')
  //   }
  //   const result = await sign({ hash: data.hash, account, library })
  //   if (!result) {
  //     await deactivate()
  //     throw new Error('Login sign failed')
  //   }
  //   const loginData = await login({ hash: result, account })
  //   if (!loginData) {
  //     throw new Error('No login data received')
  //   }
  //   return loginData.data
  // }, [account, library, deactivate])

  const fetchToken = async () => {
    if (!account) {
      throw new Error("User didn't connect a wallet")
    }
    const { data } = await apiService.post<Hash>(metamask.challenge, { address: account })
    if (!data.hash) {
      throw new Error('No hash received')
    }
    const result = await sign({ hash: data.hash, account, provider })
    if (!result) {
      throw new Error('Login sign failed')
    }
    const loginData = await login({ hash: result, account })
    if (!loginData) {
      throw new Error('No login data received')
    }
    return loginData.data
  }

  return { fetchToken }
}
