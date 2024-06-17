export interface WhitelabelRaw {
  createdAt: string
  deletedAt: null
  domain: string
  id: number
  updatedAt: string | null
  colors: string
  tokens: string
  pages: string
  logoUrl: string
  customStyles: string
  name: string
  title: string
  faviconUrl: string
  footerConfig: string
  defaultUrl: string
  chartsUrl?: string
}

export interface Whitelabel {
  defaultUrl: string
  createdAt: string
  deletedAt: null
  domain: string
  id: number
  updatedAt: string | null
  colors: WlColors
  tokens: string[]
  pages: string[]
  customStyles: {
    logo?: Record<string, string>
  }
  logoUrl: string
  name: string
  title: string
  faviconUrl: string
  chartsUrl?: string
  footerConfig: {
    termsLink: string
    privacyLink: string
    socialLinks: Record<string, string>
    block1?: string
    block2?: string
    block3?: string
  }
  description?: string
  bannerImageUrl?: string
  launchpadBannerTitle?: string | null
  launchpadBannerInfoRedirectTitle?: string | null
  launchpadBannerInfoRedirectUrl?: string | null
  isIxSwap?: boolean
  enableLaunchpadBanner?: boolean
  appUrl?: string
}

export interface WlColors {
  background: {
    main: string
    secondary?: string
  }
  primary: {
    main: string
    hover?: string
    disabled?: string
    additional1?: string
    additional2?: string
    additional3?: string
  }
  secondary: {
    main: string
    hover?: string
    disabled?: string
    additional1?: string
    additional2?: string
    additional3?: string
  }
  text: {
    main: string
    hover?: string
    disabled?: string
    additional1?: string
    additional2?: string
    additional3?: string
  }
  elements: {
    main: string
    hover?: string
    disabled?: string
    additional1?: string
    additional2?: string
    additional3?: string
  }
  status: {
    success: string
    successHover?: string
    successDisabled?: string
    additionalSuccess1?: string
    additionalSuccess2?: string
    additionalSuccess3?: string

    warning: string
    warningHover?: string
    warningDisabled?: string
    additionalWarning1?: string
    additionalWarning2?: string
    additionalWarning3?: string

    error: string
    errorHover?: string
    errorDisabled?: string
    additionalError1?: string
    additionalError2?: string
    additionalError3?: string

    info: string
    infoHover?: string
    infoDisabled?: string
    additionalInfo1?: string
    additionalInfo2?: string
    additionalInfo3?: string
  }
}
