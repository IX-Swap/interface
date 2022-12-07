import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { FilterConfig } from "components/Launchpad/InvestmentList/Filter"

import { KYCStatuses } from "pages/KYC/enum"

import { AppState } from "state"
import { useKYCState } from "state/kyc/hooks"
import { Offer, OfferStatus } from "state/launchpad/types"

import { toggleKYCDialog } from './actions'

import apiService from 'services/apiService'
import { number } from "@lingui/core/cjs/formats"
import { Offers } from "components/Launchpad/Offers"

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

export const useRequestWhitelist = (id: string) => {
  return React.useCallback((payload: { amount: number; isInterested: boolean }) => 
    apiService.post(`/offers/${id}/me/whitelist`, payload), [id])
}

export const useInvest = (id: string) => {
  return React.useCallback((status: OfferStatus, payload: { amount: string; txHash: string }) => {
    if (![OfferStatus.preSale, OfferStatus.sale].includes(status)) {
      throw new Error('Invalid offer status')
    }

    return apiService.post(`/offers/${id}/${status.toLowerCase()}`, payload)
  }, [id])
}

export const useClaimOffer = (id: string) => {
  return React.useCallback((isSuccessful: boolean) => 
    apiService.post(`/offers/${id}/claim/${isSuccessful ? 'tokens' : 'refund'}`, null), [id])
}
