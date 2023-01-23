import React from "react"
import lodash from 'lodash'

import { Currency, CurrencyAmount } from "@ixswap1/sdk-core"
import { useDispatch, useSelector } from "react-redux"

import { FilterConfig } from "components/Launchpad/InvestmentList/Filter"
import { SearchConfig, OrderConfig } from "components/LaunchpadIssuance/IssuanceDashboard/SearchFilter"

import { KYCStatuses } from "pages/KYC/enum"

import { AppState } from "state"
import { useKYCState } from "state/kyc/hooks"
import { tryParseAmount } from "state/swap/helpers"

import { Asset, Issuance, IssuancePlain, IssuanceVetting, Offer, OfferFileType, OfferStatus, WhitelistStatus } from "state/launchpad/types"

import { toggleKYCDialog } from "./actions"

import apiService from "services/apiService"
import { PaginateResponse } from "types/pagination"
import { DirectorInfo, VettingFormValues } from "components/LaunchpadIssuance/IssuanceForm/Vetting/types"
import { initialValues as vettingInitialFormValues } from "components/LaunchpadIssuance/IssuanceForm/Vetting/util"
import { InformationFormValues } from "components/LaunchpadIssuance/IssuanceForm/Information/types"
import { initialValues } from "pages/CreatePayoutEvent/mock"

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

export const useLoader = (initial = true) => {
  const [isLoading, setLoading] = React.useState(initial)

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

export const useFormatOfferValue = (addComa = true) => {
  return React.useCallback((value: string) => {
    let result = value

    if (result) {
      const [wholeNumber, decimals] = result.split('.')

      const digits = wholeNumber
        .split('').reverse()
        .filter(x => /[0-9]/.test(x))

      result = digits
        .flatMap((x, idx) => addComa && idx > 0 && idx % 3 === 0 ? [',', x] : x)
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

export const useGetOffer = (id: string | number | undefined) => {
  const loader = useLoader()
  const [data, setData] = React.useState<Offer>()

  const load = React.useCallback(() => {
    apiService.get(`/offers/${id}`)
      .then(res => res.data as Offer)
      .then(setData)
      .finally(loader.stop)
  }, [])

  React.useEffect(() => { load() }, [])

  return { loading: loader.isLoading, load, data }
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
      .get('/issuances/plain')
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
      .get('/issuances/full')
      .then(res => res.data as PaginateResponse<Issuance>)
      .then(res => setItems(res.items))
      .then(loader.stop)
  }, [])

  React.useEffect(() => { load() }, [])

  return { items, load, loading: loader.isLoading }
}

export const useGetIssuance = () => {
  const loader = useLoader()

  const [data, setData] = React.useState<Issuance>()

  const load = React.useCallback((id?: number) => {
    if (!id) {
      return
    }

    loader.start()

    return apiService
      .get(`/issuances/${id}/full`)
      .then(res => res.data as Issuance)
      .then(setData)
      .then(loader.stop)
  }, [])

  return { data, load, loading: loader.isLoading }
}

export const useVetting = (issuanceId?: number) => {
  const loader = useLoader()
  const [vetting, setVettings] = React.useState<IssuanceVetting>()

  React.useEffect(() => {
    if (issuanceId) {
      apiService.get(`/vettings/by-issuance/${issuanceId}`)
        .then(res => res.data as IssuanceVetting)
        .then(setVettings)
        .then(loader.stop)
    }
  }, [issuanceId])

  return { data: vetting, loading: loader.isLoading }
}

export const useVettingFormInitialValues = (issuanceId?: number) => {
  const loader = useLoader()
  const vetting = useVetting(issuanceId)

  const [values, setValues] = React.useState<VettingFormValues>()

  const getFile = React.useCallback((asset?: Asset) => {
    if (!asset) {
      return
    }

    return fetch(asset.public)
      .then(res => res.blob())
      .then(res => ({ id: asset.id, file: new File([res], asset.name) }))
  }, [])

  const findFile = React.useCallback((files: { id: number, file: File}[], id?: number) => {
    if (!id) {
      return 
    }

    return files.find(x => x.id === id)
  }, [])

  const transform = React.useCallback(async (payload: IssuanceVetting) => {
    const files = await Promise.all([
      getFile(payload.document.pitchDeck),
      getFile(payload.document.certificateOfIncorporation),
      getFile(payload.document.certificateOfIncumbency),
      getFile(payload.document.memorandumArticle),
      getFile(payload.document.ownershipStructure),
      getFile(payload.document.resolutionAuthorizedSignatory),
      getFile(payload.document.shareDirectorRegistry),
      getFile(payload.document.auditedFinancials),

      ...payload.fundingDocuments.map(x => getFile(x.document)),
      
      ...payload.directors.flatMap(entry => [getFile(entry.proofOfAddress), getFile(entry.proofOfIdentity)]),
      ...payload.beneficialOwners.flatMap(entry => [getFile(entry.proofOfAddress), getFile(entry.proofOfIdentity)]),
    ])
      .then(files => files.filter(x => !!x).map(x => x as { id: number, file: File }))

    const owners = payload.beneficialOwners.map(director => ({
      ...director,
      proofOfAddress: findFile(files, director.proofOfAddress?.id),
      proofOfIdentity: findFile(files, director.proofOfIdentity?.id)
    }))

    const directors = payload.directors.map(director => ({
      ...director,
      proofOfAddress: findFile(files, director.proofOfAddress?.id),
      proofOfIdentity: findFile(files, director.proofOfIdentity?.id)
    }))

    return {
      ...payload,

      document: {
        pitchDeck: findFile(files, payload.document.pitchDeck?.id),
        certificateOfIncorporation: findFile(files, payload.document.certificateOfIncorporation?.id),
        certificateOfIncumbency: findFile(files, payload.document.certificateOfIncumbency?.id),
        memorandumArticle: findFile(files, payload.document.memorandumArticle?.id),
        ownershipStructure: findFile(files, payload.document.ownershipStructure?.id),
        resolutionAuthorizedSignatory: findFile(files, payload.document.resolutionAuthorizedSignatory?.id),
        shareDirectorRegistry: findFile(files, payload.document.shareDirectorRegistry?.id),
        auditedFinancials: findFile(files, payload.document.auditedFinancials?.id),
      },

      directors: directors.length > 0 ? directors : vettingInitialFormValues.directors,
      beneficialOwners: owners.length > 0 ? owners : vettingInitialFormValues.beneficialOwners,

      fundingDocuments: payload.fundingDocuments.map(doc => ({ id: doc.document.id, file: findFile(files, doc.document.id) }))
    } as unknown as VettingFormValues
  }, [])

  React.useEffect(() => {
    if (!vetting.loading && !vetting.data) {
      setValues(vettingInitialFormValues)
      loader.stop()
    } else if (!vetting.loading && vetting.data) {
      transform(vetting.data!)
        .then(setValues)
        .then(loader.stop)
    }
  }, [vetting.loading])

  return { data: values, loading: loader.isLoading, vettingId: vetting.data?.id }
}

export const useGetIssuances = () => {
  return React.useCallback(async (page: number, filter?: SearchConfig, order?: OrderConfig, size = 10) => {
    let query = [`page=${page}`, `offset=${size}`]

    if (filter) {
      query = query.concat(Object.entries(filter)
        .filter(([_, value]) => value.length > 0)
        .map(([key, value]) => `${key}=${typeof value === 'string' ? value : value.map((x: any) => x.value).join(',')}`))
    }

    if (order) {
      query = query.concat(Object.entries(order)
        .filter(([_, value]) => value && value.length > 0)
        .map(([key, value]) => `order=${key}=${value}`))
    }

    const result = await apiService.get(`/issuances/full?${query.join('&')}`).then(res => res.data as PaginateResponse<Issuance>)

    return {
      hasMore: result.nextPage !== null,
      items: result.items,
      
      totalPages: result.totalPages,
      totalItems: result.totalItems,
    }
  }, [])
}

export const useGetFieldArrayId = () => {
  let counter = 0;

  return React.useCallback(() => ++counter, []);
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



const useUploadVettingFiles = () => {
  const uploadFiles = useUploadFiles()

  return React.useCallback(async (payload: VettingFormValues, initial: VettingFormValues) => {
    const files: FileUpload[] = []
    const filesToRemove: { name: string, id: number | null } [] = []

    const addDocument = (key: keyof VettingFormValues['document']) => {
      if (!initial.document[key] || initial.document[key].id !== payload.document?.[key]?.id) 
        files.push({ name: `document.${key}Id`, file: payload.document[key]?.file })
      
      if(initial.document[key] && payload.document?.[key] === null)
        filesToRemove.push({ name: `document.${key}Id`, id: null })
    }

    payload.directors?.forEach((entry, idx) => {
      if (!initial.directors[idx]?.proofOfAddress || initial.directors[idx]?.proofOfAddress.id !== entry.proofOfAddress?.id)
        files.push({ name: `directors.${idx}.proofOfAddressId`, file: entry.proofOfAddress?.file })

      if (!initial.directors[idx]?.proofOfIdentity || initial.directors[idx]?.proofOfIdentity.id !== entry.proofOfIdentity.id)
        files.push({ name: `directors.${idx}.proofOfIdentityId`, file: entry.proofOfIdentity?.file })
    })

    payload.beneficialOwners?.forEach((entry, idx) => {
      if (!initial.beneficialOwners[idx]?.proofOfAddress || initial.beneficialOwners[idx]?.proofOfAddress.id !== entry.proofOfAddress?.id)
        files.push({ name: `beneficialOwners.${idx}.proofOfAddressId`, file: entry.proofOfAddress?.file })
      if (!initial.beneficialOwners[idx]?.proofOfIdentity || initial.beneficialOwners[idx]?.proofOfIdentity.id !== entry.proofOfIdentity.id)
        files.push({ name: `beneficialOwners.${idx}.proofOfIdentityId`, file: entry.proofOfIdentity?.file })
    })

    payload.fundingDocuments?.forEach((entry, idx) => {
      if (!initial.fundingDocuments.some(x => x.id === entry.id)) 
        files.push({ name: `fundingDocuments.${idx}`, file: entry.file?.file })
    })

    Object.keys(payload.document).map(key => addDocument(key as keyof VettingFormValues['document']))

    const updatedFundingDocuments = new Set(payload.fundingDocuments.map(x => x.id))
    const removedFundingDocuments = initial.fundingDocuments.filter(x => !updatedFundingDocuments.has(x.id))

    const filesToUpload = files.filter(x => !!x.file) 

    const uploadedFiles = filesToUpload.length === 0 ? [] : await uploadFiles(filesToUpload)

    return [ ...uploadedFiles, ...filesToRemove]

    /*if (filesToUpload.length === 0 && filesToRemove.length === 0) {
      return []
    }
    return uploadFiles(filesToUpload)*/
  }, [uploadFiles])
}

export const useSaveVettingDraft = (issuanceId?: number) => {
  const uploadFiles = useUploadVettingFiles()

  return React.useCallback(async (payload: VettingFormValues, initialValues: VettingFormValues, vettindId?: number) => {
    let data: Record<string, any> = { 
      issuanceId,

      toSubmit: false,

      applicantFullName: payload.applicantFullName,
      email: payload.email,

      companyName: payload.companyName,
      companyWebsite: payload.companyWebsite,

      description: payload.description,

      document: payload.document,
      directors: payload.directors
        .map((x: any) => ({ 
          id: x.id,
          fullName: x.fullName,
          proofOfIdentityId: x.proofOfIdentityId,
          proofOfAddressId: x.proofOfAddressId
        })),

      beneficialOwners: payload.beneficialOwners
        .map((x: any) => ({ 
          id: x.id,
          fullName: x.fullName,
          proofOfIdentityId: x.proofOfIdentityId,
          proofOfAddressId: x.proofOfAddressId
        })),

      fundingDocuments: payload.fundingDocuments
    }

    const uploadedFiles = await uploadFiles(payload, initialValues)

    const updateDirectors = (key: 'directors' | 'beneficialOwners') => {
      const fileUpdates = uploadedFiles
        .filter(x => x.name.startsWith(key))
        .map(x => ({ ...x, name: x.name.split('.')[2] as keyof DirectorInfo, index: Number(x.name.split('.')[1]) }))

      
      fileUpdates.forEach(x => {
        data[key][x.index][x.name] = x.id
      })

      const existingIds = new Set(initialValues[key].map(x => x.id))

      payload[key]
        .forEach((x, idx) => {
          if (!existingIds.has(x.id)) {
            delete data[key][idx].id
          }
        })
    }

    updateDirectors('beneficialOwners')
    updateDirectors('directors')

    data.document = uploadedFiles
      .filter(x => x.name.startsWith('document'))
      .map(x => ({ ...x, name: x.name.split('.').pop()! }))
      .reduce((acc, e) => ({ ...acc, [e.name]: e.id }), {})

    data.fundingDocuments = uploadedFiles
      .filter(x => x.name.startsWith('fundingDocuments'))
      .map(x => x.id)

    data = Object.entries(data)
      .filter(([key, value]) => typeof value === 'boolean' || value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value}), {})

    if (vettindId) {
      delete data.issuanceId
      return apiService.put(`/vettings/${vettindId}`, data)
    } else {
      return apiService.post(`/vettings`, data)
    }

  }, [uploadFiles])
}

export const useSubmitVettingForm = (issuanceId?: number) => {
  const uploadFiles = useUploadVettingFiles()

  return React.useCallback(async (payload: VettingFormValues, initialValues: VettingFormValues, vettindId?: number) => {
    const uploadedFiles = await uploadFiles(payload, initialValues)

    const findDoc = (key: keyof VettingFormValues['document']) => 
      uploadedFiles.find(x => x.name === `document.${key}Id`)?.id ?? initialValues.document[key].id

    const data: Record<string, any> = { 
      issuanceId,

      toSubmit: true,

      applicantFullName: payload.applicantFullName,
      email: payload.email,

      companyName: payload.companyName,
      companyWebsite: payload.companyWebsite,

      description: payload.description,

      document: {
        pitchDeckId: findDoc('pitchDeck'),
        
        certificateOfIncorporationId: findDoc('certificateOfIncorporation'),
        certificateOfIncumbencyId: findDoc('certificateOfIncumbency'),

        shareDirectorRegistryId: findDoc('shareDirectorRegistry'),
        auditedFinancialsId: findDoc('auditedFinancials'),

        memorandumArticleId: findDoc('memorandumArticle'),
        ownershipStructureId: findDoc('ownershipStructure'),

        resolutionAuthorizedSignatoryId: findDoc('resolutionAuthorizedSignatory'),
      },

      directors: payload.directors
        .map((x: any) => ({ 
          id: x.id,
          fullName: x.fullName,
          proofOfIdentityId: x.proofOfIdentityId,
          proofOfAddressId: x.proofOfAddressId
        })),

      beneficialOwners: payload.beneficialOwners
        .map((x: any) => ({ 
          id: x.id,
          fullName: x.fullName,
          proofOfIdentityId: x.proofOfIdentityId,
          proofOfAddressId: x.proofOfAddressId
        })),

      fundingDocuments: payload.fundingDocuments
    }


    const updateDirectors = (key: 'directors' | 'beneficialOwners') => {
      const fileUpdates = uploadedFiles
        .filter(x => x.name.startsWith(key))
        .map(x => ({ ...x, name: x.name.split('.')[2] as keyof DirectorInfo, index: Number(x.name.split('.')[1]) }))

      
      fileUpdates.forEach(x => {
        data[key][x.index][x.name] = x.id
      })

      const existingIds = new Set(initialValues[key].map(x => x.id))

      payload[key]
        .forEach((x, idx) => {
          if (!existingIds.has(x.id)) {
            delete data[key][idx].id
          }
        })
    }

    updateDirectors('beneficialOwners')
    updateDirectors('directors')

    const updatedFundingDocuments = new Set(payload.fundingDocuments.map(x => x.id))
    const oldFundingDocs = initialValues.fundingDocuments
      .map(x => x.id)
      .filter(x => !updatedFundingDocuments.has(x))

    data.fundingDocuments = [
      ...oldFundingDocs,
      ...uploadedFiles
        .filter(x => x.name.startsWith('fundingDocuments'))
        .map(x => x.id)
    ]

    if (vettindId) {
      delete data.issuanceId
      return apiService.put(`/vettings/${vettindId}`, data)
    } else {
      return apiService.post(`/vettings`, data)
    }
  }, [issuanceId, uploadFiles])
}

const useUploadOfferFiles = () => {
  const uploadFiles = useUploadFiles()

  const getMemberFiles = React.useCallback((payload: InformationFormValues, initial: InformationFormValues) => {
    const uploadedFiles = new Set(initial.members.filter(x => x.photo?.id).map(x => x.photo?.id))

    const files: FileUpload[] = []
    
    payload.members.forEach((entry, idx) => {
      if (uploadedFiles.has(entry.photo?.id)) {
        return
      }

      files.push({ name: `member.photo.${idx}`, file: entry.photo.file })
    })

    return files
  }, [])

  const getImageFiles = React.useCallback((payload: InformationFormValues, initial: InformationFormValues) => {
    const uploadedFiles = new Set(initial.images.filter(x => x.id).map(x => x.id))
    
    const files: FileUpload[] = []

    payload.images.forEach((entry, idx) => {
      if (uploadedFiles.has(entry.id)) {
        return
      }

      files.push({ name: `image.${idx}`, file: entry.file })
    })

    return files
  }, [])

  const getDocumentFiles = React.useCallback((payload: InformationFormValues, initial: InformationFormValues) => {
    const uploadedFiles = new Set(initial.additionalDocuments.filter(x => x.file.id).map(x => x.file.id))
    
    const files: FileUpload[] = []

    payload.additionalDocuments.forEach((entry, idx) => {
      if (uploadedFiles.has(entry.file.id)) {
        return
      }

      files.push({ name: `document.${idx}`, file: entry.file.file })
    })

    return files
  }, [])

  return React.useCallback((payload: InformationFormValues, initial: InformationFormValues) => {
    const files = [
      ...getDocumentFiles(payload, initial),
      ...getImageFiles(payload, initial),
      ...getMemberFiles(payload, initial),
    ]

    if (payload.cardPicture.id !== initial.cardPicture.id) {
      files.push({ name: 'card', file: payload.cardPicture.file })
    }
    
    if (payload.profilePicture.id !== initial.profilePicture.id) {
      files.push({ name: 'profile', file: payload.cardPicture.file })
    }

    return uploadFiles(files)
  }, [uploadFiles, getDocumentFiles, getImageFiles, getMemberFiles])
}

export const useSubmitOffer = (vettingId?: number | string) => {
  const uploadFiles = useUploadOfferFiles()

  return React.useCallback(async (payload: InformationFormValues, initial: InformationFormValues, draft = false, offerId?: number) => {
    const uploadedFiles = await uploadFiles(payload, initial)
      
    const findDoc = (prefix: 'member' | 'document' | 'image', idx: number) => 
      uploadedFiles.find(x => x.name === `${prefix}.${idx}`)?.id 

    const data: Record<string, any> = {
      offerId,
      vettingId,

      toSubmit: !draft,

      title: payload.name,

      shortDescription: payload.shortDescription,
      longDescription: payload.longDescription,

      type: payload.tokenType,
      network: payload.network,
      industry: payload.industry,
      investmentType: payload.investmentType,

      issuerIdentificationNumber: payload.issuerIdentificationNumber,
      country: payload.country,

      socialMedia: payload.social.reduce((acc, e) => ({...acc, [e.type]: e.url}), {}),

      tokenAddress: "",
      tokenSymbol: payload.tokenTicker,
      tokenPrice: payload.tokenPrice,
      tokenStandart: payload.tokenStandart,

      investingTokenAddress: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      investingTokenSymbol: "USDC",

      decimals: 18,

      softCap: payload.softCap,
      hardCap: payload.hardCap,

      minInvestment: payload.minInvestment,
      maxInvestment: payload.maxInvestment,

      hasPresale: payload.hasPresale,
      presaleMinInvestment: payload.presaleMinInvestment,
      presaleMaxInvestment: payload.presaleMaxInvestment,
      presaleAlocated: payload.presaleAlocated,

      contactUsEmail: payload.email,
      issuerWebsite: payload.website,
      whitepaperUrl: payload.whitepaper,

      allowOnlyAccredited: true,

      profilePictureId: uploadedFiles.find(x => x.name === 'profile')?.id ?? initial.profilePicture.id,
      cardPictureId: uploadedFiles.find(x => x.name === 'card')?.id ?? initial.cardPicture.id,

      terms: {
        investmentStructure: payload.terms.investmentStructure,
        dividentYield: payload.terms.dividentYield,
        investmentPeriod: payload.terms.investmentPeriod,
        grossIrr: payload.terms.grossIrr,
        distributionFrequency: payload.terms.distributionFrequency
      },

      faq: payload.faq.map(x => ({ question: x.question, answer: x.answer })),

      members: payload.members.map((x, idx) => ({
        avatarId: findDoc('member', idx) ?? initial.members[idx].photo.id,
        name: x.name,
        title: x.role,
        description: x.about
      })),

      files: [
        ...payload.additionalDocuments.map((x, idx) => ({
          type: OfferFileType.document,
          fileId: findDoc('document', idx) ?? initial.additionalDocuments[idx].file.id
        })),
        
        ...payload.images.map((x, idx) => ({
          type: OfferFileType.image,
          fileId: findDoc('image', idx) ?? initial.images[idx].id
        })),

        ...payload.videos.map(x => ({
          type: OfferFileType.video,
          videoUrl: x.url
        })),
      ],
      
      timeframe: {
        whitelist: payload.timeframe.whitelist,
        preSale: payload.timeframe.presale,
        sale: payload.timeframe.sale,
        closed: payload.timeframe.closed,
        claim: payload.timeframe.claim
      }
    }

    if (offerId) {
      delete data.offerId
      return apiService.put(`/offers/${offerId}`, data)
    } else {
      return apiService.post(`/offers`, data)
    }
  }, [uploadFiles, vettingId])
}
