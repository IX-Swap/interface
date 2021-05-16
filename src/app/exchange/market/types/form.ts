export interface PlaceOrderFormValues {
  type: string
  timeInForce: string
  price: number
  amount: number
  slider: number
  total: number
}

export interface PlaceOrderArgs {
  pair: string
  side: string
  type: string
  price: number
  amount: number
}
