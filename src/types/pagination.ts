export interface PaginationDetails {
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
