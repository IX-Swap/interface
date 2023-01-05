import React from "react"
import lodash from 'lodash'

import { Currency, CurrencyAmount } from "@ixswap1/sdk-core"
import { useDispatch, useSelector } from "react-redux"

import { FilterConfig } from "components/Launchpad/InvestmentList/Filter"

import { KYCStatuses } from "pages/KYC/enum"

import { AppState } from "state"
import { useKYCState } from "state/kyc/hooks"
import { tryParseAmount } from "state/swap/helpers"

import { Issuance, IssuancePlain, Offer, OfferStatus, WhitelistStatus } from "state/launchpad/types"

import { toggleKYCDialog } from "./actions"

import apiService from "services/apiService"
import { PaginateResponse } from "types/pagination"
import { DirectorInfo, VettingFormValues } from "components/LaunchpadIssuance/IssuanceForm/Vetting/types"

interface OfferPagination {
  page: number
  nextPage: number
  prevPage?: number
  offset: number

  totalItems: number
  totalPages: number

  itemsCount: number

  items: Offer[]
}

export const useLoader = () => {
  const [isLoading, setLoading] = React.useState(true)

  const stop = React.useCallback(() => setLoading(false), [])
  const start = React.useCallback(() => setLoading(true), [])

  return { isLoading, stop, start }
}

export const useKYCIsModalOpen = () => {
  return useSelector<AppState, boolean>(state => state.launchpad.isKYCModalOpen)
}

export const useKYCAllowOnlyAccredited = () => {
  return useSelector<AppState, boolean>(state => state.launchpad.allowOnlyAccredited)
}

export const useToggleKYCModal = () => {
  const dispatch = useDispatch()
  const isOpen = useKYCIsModalOpen()

  return React.useCallback(() => {
    dispatch(toggleKYCDialog({ open: !isOpen }))
  }, [isOpen])
}

export const useSetAllowOnlyAccredited = () => {
  const dispatch = useDispatch()

  return React.useCallback((allowOnlyAccredited: boolean) => {
    dispatch(toggleKYCDialog({ open: allowOnlyAccredited }))
  }, [dispatch])
}

export const useCheckKYC = () => {
  const { kyc } = useKYCState()
  
  return React.useCallback((allowOnlyAccredited: boolean, isClosed: boolean) => {
    return !!kyc && kyc.status === KYCStatuses.APPROVED && (isClosed || (!allowOnlyAccredited || kyc.individual?.accredited === 1))
  }, [kyc])
}

export const useGetOffers = () => {
  return React.useCallback(async (page: number, filter?: FilterConfig) => {
    let query = [`page=${page}`, 'offset=6']

    if (filter) {
      query = query.concat(Object.entries(filter)
        .filter(([_, value]) => value.length > 0)
        .map(([key, value]) => `${key}=${typeof value === 'string' ? value : value.map((x: any) => x.value).join(',')}`))
    }

    const result = await apiService.get(`/offers?${query.join('&')}`).then(res => res.data as OfferPagination)

    return {
      hasMore: result.nextPage !== null,
      items: result.items
    }
  }, [])
}

export const useGetPinnedOffer = () => {
  return React.useCallback(() => apiService.get('/offers/main').then(res => res.data as Offer), [])
}

export const useFormatOfferValue = () => {
  return React.useCallback((value: string) => {
    let result = value

    if (result) {
      const [wholeNumber, decimals] = result.split('.')

      const digits = wholeNumber
        .split('').reverse()
        .filter(x => /[0-9]/.test(x))

      result = digits
        .flatMap((x, idx) => idx > 0 && idx % 3 === 0 ? [',', x] : x)
        .flat().reverse()
        .join('')
      
      if (decimals !== undefined) {
        result = result.concat(`.${decimals}`)
      }
    }

    return result
  }, [])
}

interface GetSupportPayload {
  email: string
  subject: string
  text: string
  offerId?: string
}

export const useRequestSupport = () => {
  return React.useCallback((payload: GetSupportPayload) => {
    return apiService.post(`/offers/support`, payload)
  }, [])
}

export const useSubscribeToOffer = () => {
  return React.useCallback((email: string, offerId?: string) => apiService.post('/offers/subscribe', { email, offerId }), [])
}

export const useGetOffer = () => {
  return React.useCallback((id: string) => apiService.get(`/offers/${id}`).then(res => res.data as Offer), [])
}

export const useGetWhitelistStatus = (id: string) => {
  const [loading, setLoading] = React.useState(true)
  const [info, setInfo] = React.useState<{ status: WhitelistStatus, isInterested: number }>()

  const getWhitelist = React.useCallback(() => apiService.get(`/offers/${id}/me/whitelist`), [id])

  React.useEffect(() => {
    getWhitelist().then(res => setInfo(res.data)).finally(() => setLoading(false))
  }, [id])

  return { ...info, loading }
}

export const useRequestWhitelist = (id: string) => {
  return React.useCallback((payload: { amount: number; isInterested: boolean }) => 
    apiService.post(`/offers/${id}/me/whitelist`, payload), [id])
}

export const useInvest = (id: string) => {
  return React.useCallback((status: OfferStatus, payload: { amount: string; txHash: string }) => {
    if (![OfferStatus.preSale, OfferStatus.sale].includes(status)) {
      throw new Error('Invalid offer status')
    }

    return apiService.post(`/offers/${id}/invest/${status.toLowerCase()}`, payload)
  }, [id])
}

export const useDerivedBalanceInfo = (id: string) => { 
  return React.useCallback((
    amount: string,
    inputCurrency: Currency | null | undefined,
    balance?: CurrencyAmount<Currency>
  ) => {
    if (amount) {
      const realAmount = amount.replace(/,/g, '')
      const parsedAmount = tryParseAmount(realAmount, inputCurrency ?? undefined)
  
      return parsedAmount && balance && !balance.lessThan(parsedAmount)
    }
    return true
  }, [id])
}

export const useClaimOffer = (id: string) => {
  return React.useCallback((isSuccessful: boolean) => 
    apiService.post(`/offers/${id}/claim/${isSuccessful ? 'tokens' : 'refund'}`, null), [id])
}

export const useCreateIssuance = () => {
  return React.useCallback((name: string) => apiService.post('/issuances', { name }).then(res => res.data as Issuance), [])
}

export const useGetIssuancePlain = () => {
  const loader = useLoader()

  const [items, setItems] = React.useState<IssuancePlain[]>([])

  const load = React.useCallback(() => {
    loader.start()

    return apiService
      .get('/issuances/me/plain')
      .then(res => res.data as IssuancePlain[])
      .then(setItems)
      .then(loader.stop)
  }, [])

  React.useEffect(() => { load() }, [])

  return { items, load, loading: loader.isLoading }
}

export const useGetIssuanceFull = () => {
  const loader = useLoader()

  const [items, setItems] = React.useState<Issuance[]>([])

  const load = React.useCallback(() => {
    loader.start()

    return apiService
      .get('/issuances/me/full')
      .then(res => res.data as PaginateResponse<Issuance>)
      .then(res => setItems(res.items))
      .then(loader.stop)
  }, [])

  React.useEffect(() => { load() }, [])

  return { items, load, loading: loader.isLoading }
}

export const useGetFieldArrayId = () => {
  let counter = 0;

  return () => ++counter;
}

interface FileUpload {
  name: string
  file: File
}

export const useUploadFiles = () => {
  return React.useCallback(async (files: FileUpload[]) => {
    const data = new FormData()

    for (const entry of files) {
      data.append(entry.name, entry.file)
    }

    return await apiService
      .post('/storage/batch', data)
      .then(res => res.data as { [key: string]: number })
      .then(res => lodash.toPairs(res))
      .then(res => res.map(([name, id]) => ({ name, id })));
  }, [])
}

export const useSubmitVettingForm = (issuanceId?: number) => {
  const uploadFiles = useUploadFiles()

  const uploadVettingFiles = React.useCallback(async (payload: VettingFormValues) => {
    const files: FileUpload[] = []

    payload.directors.forEach((entry, idx) => {
      files.push({ name: `directors.${idx}.proofOfAddressId`, file: entry.proofOfAddress })
      files.push({ name: `directors.${idx}.proofOfIdentityId`, file: entry.proofOfIdentity })
    })

    payload.beneficialOwners.forEach((entry, idx) => {
      files.push({ name: `beneficialOwners.${idx}.proofOfAddressId`, file: entry.proofOfAddress })
      files.push({ name: `beneficialOwners.${idx}.proofOfIdentityId`, file: entry.proofOfIdentity })
    })

    payload.fundingDocuments.forEach((entry, idx) => {
      files.push({ name: `fundingDocuments.${idx}`, file: entry })
    })

    files.push({ name: 'document.pitchDeckId', file: payload.pitchDeck })
    files.push({ name: 'document.certificateOfIncorporationId', file: payload.certificateOfIncorporation })
    files.push({ name: 'document.certificateOfIncumbencyId', file: payload.certificateOfIncumbency })
    files.push({ name: 'document.shareDirectorRegistryId', file: payload.shareDirectorRegistry })
    files.push({ name: 'document.auditedFinancialsId', file: payload.auditedFinancials })
    files.push({ name: 'document.memorandumArticleId', file: payload.memorandumArticle })
    files.push({ name: 'document.ownershipStructureId', file: payload.ownershipStructure })
    files.push({ name: 'document.resolutionAuthorizedSignatoryId', file: payload.resolutionAuthorizedSignatory })

    return uploadFiles(files)
  }, [uploadFiles])

  return React.useCallback(async (payload: VettingFormValues, isDraft = false) => {
    const data: Record<string, any> = { 
      issuanceId,

      toSubmit: !isDraft,

      applicantFullName: payload.applicantFullname,
      email: payload.email,

      companyName: payload.companyName,
      companyWebsite: payload.companyWebsite,

      description: payload.description,
    }

    const uploadedFiles = await uploadVettingFiles(payload)

    const getDirectorFiles = (key: string) => {
      const result = uploadedFiles
        .filter(x => x.name.startsWith(key))
        .map(x => {
          const [index, fileName] = x.name.split('.').slice(1)

          return ({ id: x.id, name: fileName, index })
        })
        .reduce((acc, e) => {
          return { ...acc, [e.index]: { ...acc[e.index], [e.name]: e.id}}
        }, {} as { [n: string]: Partial<DirectorInfo> })

      return Object.entries(result)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([ index, value ]) => value)
    }

    console.log('Directors: ', getDirectorFiles('directors'))
    
    
    data.directors = getDirectorFiles('directors')
      .map((entry, idx) => ({ ...entry, fullName: payload.directors[idx].fullName }))

    data.beneficialOwners = getDirectorFiles('beneficialOwners')
      .map((entry, idx) => ({ ...entry, fullName: payload.beneficialOwners[idx].fullName }))

    data.document = uploadedFiles
      .filter(x => x.name.startsWith('document'))
      .map(x => ({ ...x, name: x.name.split('.').pop()! }))
      .reduce((acc, e) => ({ ...acc, [e.name]: e.id }), {})

    data.fundingDocuments = uploadedFiles
      .filter(x => x.name.startsWith('fundingDocuments'))
      .map(x => x.id)


    const result = await apiService.post('/vettings', data)

    console.log(result)

    return result
  }, [uploadVettingFiles])
}