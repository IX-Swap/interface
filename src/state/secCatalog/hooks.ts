import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import apiService from 'services/apiService'
import { secCatalog } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { BROKER_DEALERS_STATUS } from 'state/brokerDealer/hooks'
import { MAX_FILE_UPLOAD_SIZE, MAX_FILE_UPLOAD_SIZE_ERROR } from 'constants/constants'
import { fetchAddIssuer, fetchEditIssuer, fetchIssuers, fetchIssuersTokens } from './actions'
import { Issuer } from './reducer'
import { isValidAddress } from 'utils'

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
  const { name, url, logo } = issuer
  const formData = new FormData()

  if (logo) formData.append('logo', logo, logo.name)
  formData.append('name', name)
  formData.append('url', url)

  try {
    const result = await apiService.put(secCatalog.issuer(issuerId), formData)
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const getIssuers = async (params?: Record<string, string | number>) => {
  const result = await apiService.get(secCatalog.allIssuers, undefined, params)
  return result.data
}

export const getIssuer = async (issuerId: number) => {
  try {
    const result = await apiService.get(secCatalog.issuer(issuerId))
    return result.data
  } catch (e) {
    console.log(e)
  }
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

export const getMyTokens = async (params: any) => {
  try {
    const result = await apiService.get(secCatalog.myTokens, undefined, params)
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const checkWrappedAddress = async (address: string) => {
  try {
    const result = await apiService.get(secCatalog.checkWrappedAddress(address))
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const getAtlasInfo = async (tokenId: string) => {
  try {
    const result = await apiService.get(secCatalog.getAtlasInfo(tokenId))
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const getAtlasAll = async () => {
  try {
    const result = await apiService.get(secCatalog.getAtlasAll)
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
        dispatch(fetchEditIssuer.rejected({ errorMessage: 'Could not edit issuer' }))
        return BROKER_DEALERS_STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export function useFetchIssuers() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (params?: Record<string, string | number>) => {
      try {
        dispatch(fetchIssuers.pending())
        const data = await getIssuers(params)
        dispatch(fetchIssuers.fulfilled({ data }))
      } catch (error: any) {
        dispatch(fetchIssuers.rejected({ errorMessage: 'Could not create issuer' }))
      }
    },
    [dispatch]
  )
  return callback
}

export function useFetchTokens() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (params?: Record<string, string | number>) => {
      try {
        dispatch(fetchIssuersTokens.pending())
        const data = await getMyTokens({ ...params, my: false, active: true })
        dispatch(fetchIssuersTokens.fulfilled({ data }))
      } catch (error: any) {
        dispatch(fetchIssuersTokens.rejected({ errorMessage: 'Could not fetch tokens' }))
      }
    },
    [dispatch]
  )
  return callback
}

const stringLengthValidator = (key: string, value: string, maxLength = 100) => {
  if (value.length > maxLength) return { [key]: `Max length is ${maxLength} chars` }
  return null
}

const isEmpty = (value: any) => {
  if (value === '' || value === null) return 'This field is required'
  return null
}

const isEmptyObject = (value: Record<string, any>) => {
  const isValid = Object.values(value).some((val) => Boolean(val))

  if (isValid) return null
  return 'This field is required'
}

const urlValidator = (url: string) => {
  if (
    url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) ===
    null
  )
    return { url: 'Must be a valid URL' }
  else return null
}

const logoValidator = (logo: any) => {
  if (logo?.size > MAX_FILE_UPLOAD_SIZE) return { logo: MAX_FILE_UPLOAD_SIZE_ERROR }
  else return null
}

export const validateIssuer = (issuer: any) => {
  const { url, name, file } = issuer

  return {
    url: isEmpty(url),
    name: isEmpty(name),
    logo: isEmpty(file),
    ...urlValidator(url),
    ...stringLengthValidator('name', name),
    ...logoValidator(file),
  }
}

export const validateToken = (token: any) => {
  const { address, ticker, file, companyName, url, description, industry, country, chainId, kycTypeJson } = token

  return {
    address: !Boolean(isValidAddress(address || '')) ? 'Invalid address' : null,
    ticker: isEmpty(ticker),
    logo: isEmpty(file),
    companyName: isEmpty(companyName),
    description: isEmpty(description),
    industry: isEmpty(industry),
    country: isEmpty(country),
    chainId: isEmpty(chainId),
    kycTypeJson: isEmptyObject(kycTypeJson || {}),
    ...urlValidator(url),
    ...stringLengthValidator('companyName', companyName, 100),
    ...stringLengthValidator('description', description, 1000),
    ...stringLengthValidator('ticker', ticker, 5),
    ...logoValidator(file),
  }
}
