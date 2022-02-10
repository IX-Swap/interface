import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import apiService from 'services/apiService'
import { secCatalog } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { BROKER_DEALERS_STATUS } from 'state/brokerDealer/hooks'
import { validateSecTokenFields } from 'components/AdminSecurityCatalog/mock'
import { fetchAddIssuer, fetchEditIssuer, fetchIssuers, fetchIssuersTokens } from './actions'
import { Issuer } from './reducer'

export function useSecCatalogState() {
  return useSelector<AppState, AppState['secCatalog']>((state) => state.secCatalog)
}

export const addIssuer = async (issuer: Issuer) => {
  const { name, logo, url } = issuer
  const formData = new FormData()
  formData.append('logo', logo, logo.name)
  formData.append('name', name)
  formData.append('url', url)
  formData.append('description', '123')

  try {
    const result = await apiService.post(secCatalog.createIssuer, formData)
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const updateToken = async (token: any) => {
  const formData = new FormData()
  for (const key in token) {
    if (key === 'logo' && token.file) {
      formData.append('logo', token.file, token.file.name)
    }
    if (key !== 'id' && key !== 'file' && key !== 'filePath') {
      formData.append(key, token[key])
    }
  }

  try {
    const result = await apiService.put(secCatalog.issuerToken(token.id), formData)
    return result.data
  } catch (e) {
    return null
  }
}

export const addToken = async (issuerId: number, token: any) => {
  const formData = new FormData()
  for (const key in token) {
    if (key === 'logo' && token.file) {
      formData.append('logo', token.file, token.file.name)
    }
    if (key !== 'id' && key !== 'file' && key !== 'filePath') {
      formData.append(key, token[key])
    }
  }

  try {
    const result = await apiService.post(secCatalog.createIssuerToken(issuerId), formData)
    return result.data
  } catch (e) {
    return null
  }
}

export const editIssuer = async (issuerId: number, issuer: Issuer) => {
  const { name, url } = issuer
  const formData = new FormData()
  // formData.append('logo', logo, logo.name)
  formData.append('name', name)
  formData.append('url', url)

  try {
    const result = await apiService.put(secCatalog.issuer(issuerId), formData)
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const getIssuers = async () => {
  const result = await apiService.get(secCatalog.allIssuers)
  return result.data
}

export const deleteToken = async (tokenId: number) => {
  const result = await apiService.delete(secCatalog.issuerToken(tokenId), null)
  return result.data
}

export const getAllTokens = async (params?: Record<string, string | number>) => {
  const result = await apiService.get(secCatalog.allIssuerTokens, undefined, params)
  return result.data
}

export const getToken = async (id: number) => {
  const result = await apiService.get(secCatalog.issuerToken(id))
  return result.data
}

export const checkWrappedAddress = async (address: string) => {
  try {
    const result = await apiService.get(secCatalog.checkWrappedAddress(address))
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export function useAddIssuer() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (issuer: Issuer) => {
      try {
        dispatch(fetchAddIssuer.pending())
        const data = await addIssuer(issuer)
        dispatch(fetchAddIssuer.fulfilled({ data }))
        return BROKER_DEALERS_STATUS.SUCCESS
      } catch (error: any) {
        dispatch(fetchAddIssuer.rejected({ errorMessage: 'Could not create issuer' }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export function useEditIssuer() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (issuerId: number, issuer: Issuer) => {
      try {
        dispatch(fetchEditIssuer.pending())
        const data = await editIssuer(issuerId, issuer)
        dispatch(fetchEditIssuer.fulfilled({ data }))
        return BROKER_DEALERS_STATUS.SUCCESS
      } catch (error: any) {
        dispatch(fetchEditIssuer.rejected({ errorMessage: 'Could not create issuer' }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export function useFetchIssuers() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(async () => {
    try {
      dispatch(fetchIssuers.pending())
      const data = await getIssuers()
      dispatch(fetchIssuers.fulfilled({ data }))
    } catch (error: any) {
      dispatch(fetchIssuers.rejected({ errorMessage: 'Could not create issuer' }))
    }
  }, [dispatch])
  return callback
}

export function useFetchTokens() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (params?: Record<string, string | number>) => {
      try {
        dispatch(fetchIssuersTokens.pending())
        const data = await getAllTokens(params)
        dispatch(fetchIssuersTokens.fulfilled({ data }))
      } catch (error: any) {
        dispatch(fetchIssuersTokens.rejected({ errorMessage: 'Could not fetch tokens' }))
      }
    },
    [dispatch]
  )
  return callback
}

export const validate = (token: any) => {
  for (const key in token) {
    if (validateSecTokenFields.includes(key)) if (!token[key]) return false
  }

  return true
}
