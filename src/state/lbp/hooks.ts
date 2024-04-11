import { OrderConfig, SearchConfig } from 'components/LBP/Dashboard/SearchFilter'
import { DashboardLbp, LbpFormValues } from 'components/LBP/types'
import React, { useCallback } from 'react'
import apiService from 'services/apiService'
import { PaginateResponse } from 'types/pagination'
import { Lbp } from './types'
import { FileUpload, useUploadFiles } from 'state/launchpad/hooks'
import { LBP_ACTION_TYPES } from './constants'

export const useGetLbpsFull = () => {
  return React.useCallback(
    async (page: number, filter?: SearchConfig, order?: OrderConfig, type?: string, size = 10) => {
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

      query = query.concat(`stage=${type?.toLocaleLowerCase()}`)

      const result = await apiService
        .get(`/lbp?${query.join('&')}`)
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
