import { OrderConfig, SearchConfig } from 'components/LBP/Dashboard/SearchFilter'
import { DashboardLbp, LbpFormValues } from 'components/LBP/types'
import React, { useCallback } from 'react'
import apiService from 'services/apiService'
import { PaginateResponse } from 'types/pagination'
import { Lbp } from './types'
import { FileUpload, useUploadFiles } from 'state/launchpad/hooks'
import { LBP_ACTION_TYPES } from './constants'
import { PaginationRes } from 'state/launchpad/types'

export const useGetLbpsFull = () => {
  return React.useCallback(
    async (page: number, filter?: SearchConfig, order?: OrderConfig, size = 10, isPublic: boolean = false) => {
      let query = [`page=${page}`, `offset=${size}`]

      if (filter) {
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

      // query = query.concat(`stage=${type?.toLocaleLowerCase()}`)

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

export const useGetLbpByName = () => {
  return React.useCallback(
    (name: string) => apiService.get('/lbp/by-name?name=' + name).then((res) => res.data as Lbp),
    []
  )
}

export const useCreateLbp = () => {
  return React.useCallback((name: string) => apiService.post('/lbp/draft', { name }).then((res) => res.data as Lbp), [])
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
      if (uploadedFiles) {
        payload.logoId = uploadedFiles.find((x) => x.name === 'LBPLogo')?.id
        payload.bannerId = uploadedFiles.find((x) => x.name === 'LBPBanner')?.id
        for (let i = 0; i < payload.uploadDocs?.length; i++) {
          payload.additionalDocumentIds[i] = uploadedFiles.find((x) => x.name === `uploadDocs.${i}`)?.id || 0
        }
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

export const useGetPaginatedLbpInvestors = (id: number) => {
  // return useGenericPaginationFetch(`/lbp/${id}/investors`) // TODO: API Integration

  // Mock data
  return {
    load: ({ page, order, offset }: any) => {},
    error: null,
    isLoading: false,
    data: {
      hasMore: true,
      items: [
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
      ],
      totalPages: 1,
      totalItems: 4,
    } as PaginationRes<any>,
  }
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
