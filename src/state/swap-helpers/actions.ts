import { createAction } from '@reduxjs/toolkit'

export interface BrokerDealerSwapDto {
  callbackEndpoint?: string
  encryptedData: string
  endpoint: string
  hash: string
}

export const saveBrokerDealerDto = createAction<{
  dto: BrokerDealerSwapDto | null
}>('swap-helpers/saveBrokerDealerDto')
