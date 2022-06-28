export interface WhitelabelRaw {
  createdAt: string
  deletedAt: null
  domain: string
  id: number
  updatedAt: string | null
  colors: string
}

export interface Whitelabel {
  createdAt: string
  deletedAt: null
  domain: string
  id: number
  updatedAt: string | null
  colors: WlColors
}

export interface WlColorsByType {
  background: {
    main: string
    secondary?: string
  }
  primary: {
    main: string
    hover?: string
    disabled?: string
    aditional1?: string
    aditional2?: string
    aditional3?: string
  }
  secondary: {
    main: string
    hover?: string
    disabled?: string
    aditional1?: string
    aditional2?: string
    aditional3?: string
  }
  text: {
    main: string
    hover?: string
    disabled?: string
    aditional1?: string
    aditional2?: string
    aditional3?: string
  }
  elements: {
    main: string
    hover?: string
    disabled?: string
    aditional1?: string
    aditional2?: string
    aditional3?: string
  }
  status: {
    success: string
    successHover?: string
    successDisabled?: string
    aditionalSuccess1?: string
    aditionalSuccess2?: string
    aditionalSuccess3?: string

    warning: string
    warningHover?: string
    warningDisabled?: string
    aditionalWarning1?: string
    aditionalWarning2?: string
    aditionalWarning3?: string

    error: string
    errorHover?: string
    errorDisabled?: string
    aditionalError1?: string
    aditionalError2?: string
    aditionalError3?: string

    info: string
    infoHover?: string
    infoDisabled?: string
    aditionalInfo1?: string
    aditionalInfo2?: string
    aditionalInfo3?: string
  }
}

export interface WlColors {
  dark: WlColorsByType
  light: WlColorsByType
}
