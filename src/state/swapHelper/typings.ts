export interface BrokerDealerSwapDto {
  callbackEndpoint?: string
  encryptedData: string
  endpoint: string
  hash: string
  brokerDealerId: number
}

export interface SwapConfirmArguments {
  brokerDealerId: number
  hash: string
  encryptedData: string
}

export interface SwapHelperState {
  authorization: any
}
