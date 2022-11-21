import { OfferIndustry, OfferStatus, OfferType } from "./types"

export const OFFER_INDUSTRY_LABELS = [
  { label: "Technology", value: OfferIndustry.technology},
  { label: "Finance", value: OfferIndustry.finance },
  { label: "Blockchain", value: OfferIndustry.blockchain },
  { label: "Real Estate", value: OfferIndustry.realEstate },
  { label: "Gaming", value: OfferIndustry.gaming },
  { label: "Energy", value: OfferIndustry.energy },
  { label: "Healthcare", value: OfferIndustry.healthcare},
  { label: "Others", value: OfferIndustry.other },
]

export const OFFER_STAGE_LABELS = [
  { label: 'Coming Soon', value: OfferStatus.approved },
  { label: 'Register To Invest', value: OfferStatus.whitelist },
  { label: 'Pre-Sale', value: OfferStatus.preSale },
  { label: 'Public Sale', value: OfferStatus.sale },
  { label: 'Closed', value: OfferStatus.closed },
  { label: 'Claim', value: OfferStatus.claim },
]

export const OFFER_TYPE_LABELS = [
  { label: "Security token", value: OfferType.securityToken },
  { label: "Fractionalized-NFT", value: OfferType.fNFT },
  { label: "Cryptocurrency", value: OfferType.crypto } 
]
