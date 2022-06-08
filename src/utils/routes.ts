import { Currency } from '@ixswap1/sdk-core'

import { currencyId } from './currencyId'

export const routes = {
  add: (currency0: Currency, currency1: Currency) => `/add/${currencyId(currency0)}/${currencyId(currency1)}`,
  remove: (currency0: Currency, currency1: Currency) => `/remove/${currencyId(currency0)}/${currencyId(currency1)}`,
  find: '/find',
  pool: '/pool',
  swap: '/swap',
  faucet: '/faucet',
  kyc: '/kyc',
  kycIndividual: '/kyc/individual',
  kycCorporate: '/kyc/corporate',
  createPayoutEvent: '/payout/create',
  securityTokens: (currency?: Currency & { tokenInfo?: { catalogId: number } }) =>
    `/security-tokens${currency ? `/${currency?.tokenInfo?.catalogId}` : ''}`,
  staking: '/staking',
  vesting: '/vesting',
  nftList: '/nft',
  nftCreate: '/nft-create',
  nftCollections: '/nft/collections',
  nftCollectionCreate: '/nft/collections/create',
  nftEditCollection: (id: number) => `/nft/${id}/edit`,
  nftEditCollectionPath: `/nft/:id/edit`,
  nftCollectionImport: `/nft/collections/import`,
  nftViewCollectionPath: `/nft/collections/:collectionAddress`,
  nftViewCollection: (address: string) => `/nft/collections/${address}`,
  nftItemPath: `/nft/collections/:collectionAddress/:itemId`,
  nftItem: (address: string, id: number) => `/nft/collections/${address}/${id}`,
  payoutItem: '/payout/:payoutId',
}
