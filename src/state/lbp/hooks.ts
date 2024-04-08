import { OrderConfig, SearchConfig } from 'components/LBP/Dashboard/SearchFilter'
import { DashboardLbp } from 'components/LBP/types'
import React from 'react'
import apiService from 'services/apiService'
import { PaginateResponse } from 'types/pagination'
import { Lbp } from './types'

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

export const useGetLbpByName = () => {
  return React.useCallback((name: string) => apiService.get('/lbp/by-name?name=' + name).then((res) => res.data as Lbp), [])
}

export const useCreateLbp = () => {
  return React.useCallback((name: string) => apiService.post('/lbp/draft', { name }).then((res) => res.data as Lbp), [])
}
