export interface TenantDetails {
  name?: string
  title?: string
  domain?: string
  appUrl?: string
  description?: string
  bannerImageUrl?: string
  pages?: any
  chartsUrl?: string
  enableLbp?: boolean
  defaultUrl?: string
  faviconUrl?: string
  logoUrl?: string
  enableFeaturedSecurityVaults?: boolean
  colors?: string
  customStyles?: string
  supportEmail?: string
  isIxSwap?: boolean
  tokens?: any
  enableLaunchpadBanner?: boolean
  launchpadBannerTitle?: string
  launchpadBannerInfoRedirectTitle?: string
  launchpadBannerInfoRedirectUrl?: string
  kycSuccessRedirectUrl?: string
  kycCancelRedirectUrl?: string
  footerConfig?: string
  colorButtonPrimary?: string
  termLink?: string
  policyLink?: string
  block1?: string
  block2?: string
  block3?: string
}

export interface PagesConfig {
  dex: boolean
  kyc: boolean
  lbp: boolean
  lbpAdmin: boolean
  offer: boolean
  issuance: boolean
  payout: boolean
  securityTokens: boolean
  admin: boolean
}

export interface PagesGroup {
  [key: string]: string[]
}