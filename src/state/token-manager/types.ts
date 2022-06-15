export interface PayoutEvent {
  id: number
}

export interface PayoutList {
  page: number
  offset: number
  totalItems: number
  totalPages: number
  itemCount: number
  items: PayoutEvent[]
  nextPage: number
  prevPage: number
}
