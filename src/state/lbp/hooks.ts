import { OrderConfig, SearchConfig } from 'components/LBP/Dashboard/SearchFilter'
import { DashboardLbp, LbpFormValues, MarketData } from 'components/LBP/types'
import React, { useCallback, useEffect, useState } from 'react'
import apiService from 'services/apiService'
import { PaginateResponse } from 'types/pagination'
import { Lbp } from './types'
import { FileUpload, useUploadFiles } from 'state/launchpad/hooks'
import { LBP_ACTION_TYPES } from './constants'
import { PaginationRes } from 'state/launchpad/types'
import { ethers } from 'ethers'
import { useLBPContract } from 'hooks/useContract'

export const useLBPPurchasedShares = (lbpAddress: string, account: string) => {
  const lbp = useLBPContract(lbpAddress || '')
  const [shareBalance, setShareBalance] = useState<string | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const fetchShareBalance = useCallback(async () => {
    try {
      if (lbp && account) {
        setLoading(true)
        const balance = await lbp.purchasedShares(account)
        // Decimals are hardcoded for now. We need to change it to retrieve the token's decimal value using the ERC20.decimals RPC call
        const parsedBalance = ethers?.utils?.formatUnits(balance, 18)
        setShareBalance(parsedBalance)
        setLoading(false)
      } else {
        console.error('LBP contract or account not available')
      }
    } catch (error) {
      console.error('Error fetching share balance:', error)
    }
  }, [lbp, account])

  useEffect(() => {
    fetchShareBalance()
  }, [lbp, fetchShareBalance])

  return { isLoading, shareBalance, fetchShareBalance }
}

export const useGetLbpsFull = () => {
  return React.useCallback(
    async (
      page: number,
      filter?: SearchConfig,
      order?: OrderConfig,
      size = 10,
      isPublic: boolean = false,
      type?: string
    ) => {
      let query = [`page=${page}`, `offset=${size}`]

      if (filter) {
        if (type) {
          filter.stage = []
        }
        query = query.concat(
          Object.entries(filter)
            .filter(([, value]) => value.length > 0)
            .map(
              ([key, value]) => `${key}=${typeof value === 'string' ? value : value.map((x: any) => x.value).join(',')}`
            )
        )
      }

      if (order) {
        query = query.concat(
          Object.entries(order)
            .filter(([, value]) => value && value.length > 0)
            .map(([key, value]) => `order=${key}=${value}`)
        )
      }

      if (type) {
        query = query.concat(`stage=${type?.toLocaleLowerCase()}`)
      }

      const path = isPublic ? '/lbp/public' : '/lbp'
      const result = await apiService
        .get(`${path}?${query.join('&')}`)
        .then((res) => res.data as PaginateResponse<DashboardLbp>)

      return {
        hasMore: result.nextPage !== null,
        items: result.items,

        totalPages: result.totalPages,
        totalItems: result.totalItems,
      }
    },
    []
  )
}

export const useGetLbp = () => {
  return React.useCallback((id: number) => apiService.get('/lbp/' + id).then((res) => res.data as LbpFormValues), [])
}

export const useGetLbpStats = () => {
  return React.useCallback((id: number) => apiService.get(`/lbp/${id}/stats`).then((res) => res.data as MarketData), [])
}

export const useGetLbpByName = () => {
  return React.useCallback(
    (name: string) => apiService.get('/lbp/by-name?name=' + name).then((res) => res.data as Lbp),
    []
  )
}

export const useGetLBPAuthorization = () => {
  return React.useCallback(
    (id: number) => apiService.get(`/lbp/${id}/authorization`).then((res) => res.data as LbpFormValues),
    []
  )
}

export const useCreateLbp = () => {
  return React.useCallback((name: string) => apiService.post('/lbp/draft', { name }).then((res) => res.data as Lbp), [])
}

export const useChangeLbpStatus = () => {
  return React.useCallback(
    (id: string, status: 'paused' | 'live' | 'closed' | string) =>
      apiService.put(`/lbp/${id}/changeStatus`, { status }),
    []
  )
}

export const useDeployLbp = () => {
  return React.useCallback(
    (id: string, contractAddress: string) =>
      apiService
        .put(`/lbp/deploy/${id}`, {
          contractAddress,
        })
        .then((res) => res.data),
    []
  )
}

export const useUploadLbpFiles = () => {
  const uploadFiles = useUploadFiles()

  return useCallback(
    async (payload: any) => {
      const files: FileUpload[] = []
      if (payload.LBPLogo) {
        files.push({ name: 'LBPLogo', file: payload.LBPLogo })
      }
      if (payload.LBPLogo) {
        files.push({ name: 'LBPBanner', file: payload.LBPBanner })
      }
      if (payload.uploadDocs && payload.uploadDocs.length > 0) {
        for (let i = 0; i < payload.uploadDocs?.length; i++) {
          files.push({ name: `uploadDocs.${i}`, file: payload.uploadDocs[i] })
        }
      }

      if (files.length > 0) {
        return await uploadFiles(files)
      }

      return null
    },
    [uploadFiles]
  )
}

export const useSaveOrSubmitLbp = () => {
  const uploadFiles = useUploadLbpFiles()
  return useCallback(
    async (actionType: string, payload: LbpFormValues) => {
      const uploadedFiles = await uploadFiles(payload)
      if (uploadedFiles?.length) {
        payload.logoId = uploadedFiles.find((x) => x.name === 'LBPLogo')?.id
        payload.bannerId = uploadedFiles.find((x) => x.name === 'LBPBanner')?.id
        for (let i = 0; i < payload.uploadDocs?.length; i++) {
          if (payload.uploadDocs[i].id) {
            payload.additionalDocumentIds[i] = payload.uploadDocs[i].id as number
          } else {
            payload.additionalDocumentIds[i] = uploadedFiles.find((x) => x.name === `uploadDocs.${i}`)?.id || 0
          }
        }
      } else {
        payload.logoId = payload?.LBPLogo?.id
        payload.bannerId = payload?.LBPBanner?.id
      }

      let response
      switch (actionType) {
        case LBP_ACTION_TYPES.save:
          response = await apiService.post('/lbp/draft', payload)
          break
        case LBP_ACTION_TYPES.submit:
          response = await apiService.put('/lbp/submit', payload)
          break
      }

      return response
    },
    [uploadFiles]
  )
}

export const useGetInvestorInfo = () => {
  return React.useCallback(
    (id: number) => apiService.get(`/lbp/${id}/investor-information`).then((res) => res.data as LbpFormValues),
    []
  )
}

export function useFormatNumberWithDecimal(initialNumber: number | string, decimalPlaces: number): string {
  return formatNumberWithDecimals(initialNumber, decimalPlaces)
}

function toFixedDown(number: number, precision: number) {
  const factor = Math.pow(10, precision)
  return (Math.floor(number * factor) / factor).toFixed(precision)
}

export function formatNumberWithDecimals(
  initialNumber: number | string,
  decimalPlaces: number,
  roundDown = false
): string {
  const parsedNumber = typeof initialNumber === 'string' ? parseFloat(initialNumber) : initialNumber
  if (isNaN(parsedNumber)) {
    return ''
  }
  let formattedNumber = roundDown ? toFixedDown(parsedNumber, decimalPlaces) : parsedNumber.toFixed(decimalPlaces)
  if (decimalPlaces > 0) {
    formattedNumber = formattedNumber.replace(/\.?0*$/, '')
  }
  const parts = formattedNumber.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  formattedNumber = parts.join('.')

  return formattedNumber
}

export const useGetAllLbpInvestors = () => {
  // TODO: API Integration

  // Mock data
  return useCallback((lbpId: number) => {
    return [
      {
        username: 'Test 1',
        tokenAmount: 11,
        walletAddress: '0x1234123412512512563756',
      },
      {
        username: 'Test 2',
        tokenAmount: 12,
        walletAddress: '0x1234123135134114353231',
      },
      {
        username: 'Test 3',
        tokenAmount: 13,
        walletAddress: '0x1234123412595678567885',
      },
      {
        username: 'Test 4',
        tokenAmount: 14,
        walletAddress: '0x1234123135134114353231',
      },
      {
        username: 'Test 5',
        tokenAmount: 15,
        walletAddress: '0x1234123412512512563756',
      },
      {
        username: 'Test 6',
        tokenAmount: 16,
        walletAddress: '0x1234123135134114353231',
      },
    ]
  }, [])
}
