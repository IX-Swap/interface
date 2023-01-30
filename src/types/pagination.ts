export interface PaginationDetails {
  page: number
  offset: number
  totalItems: number
  totalPages: number
  itemCount: number
  nextPage?: number
  prevPage?: number
}
export interface PaginateResponse<T> extends PaginationDetails {
  page: number
  items: Array<T>
}

export const getDefaultPaginatedResponse = <T>() => ({
  page: 0,
  offset: 0,
  totalItems: 0,
  totalPages: 0,
  itemCount: 0,
  nextPage: 0,
  prevPage: 0,
  items: [] as Array<T>,
})
