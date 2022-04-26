export interface PlaceOrderFormValues {
  price: number
  amount: number
  total: number
}

export interface PlaceOrderArgs {
  pair: string
  side: string
  type: string
  price: number
  amount: number
}
