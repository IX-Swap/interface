import { AxiosResponse } from 'axios'
import { APIResponse, PaginatedData } from 'v2/services/api/types'

export const convertPaginatedResultToFlatArray = <DataType = any>(
  pages: Array<AxiosResponse<APIResponse<PaginatedData<DataType>>>>
): DataType[] => {
  return pages
    .map(page =>
      page.data.data.reduce<DataType[]>(
        (acc, cur) => [...acc, ...cur.documents],
        []
      )
    )
    .flat()
}

export const convertDataArrayToMap = <T>(
  key: keyof T,
  data: T[]
): Record<keyof T, T> => {
  return data.reduce<any>(
    (acc, cur) => ({
      ...acc,
      [(cur[key] as unknown) as string]: cur
    }),
    {}
  )
}
