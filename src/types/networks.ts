export interface NativeCurrency {
  name: string
  symbol: string
  decimals: number
}

export interface Urls {
  home: string
  transaction: string
  address: string
  token: string
}

export interface Explorer {
  urls: Urls
  name: string
  description: string
}

export interface Param {
  _id: string
  key?: any
  value?: any
}

export interface Header {
  _id: string
  key?: any
  value?: any
}

export interface Meta {
  secretUserAgent: string
  projectId: string
  projectSecret: string
  bearer: string
}

export interface Node {
  _id: string
  name: string
  description: string
  url: string
  endpoint: string
  params: Param[]
  headers: Header[]
  user?: any
  password?: any
  meta: Meta
}

export interface Network {
  nativeCurrency: NativeCurrency
  explorer: Explorer
  supportsEvm: boolean
  hasUTXO: boolean
  _id: string
  name: string
  chainId: number
  createdAt: string // Date
  isSandbox: boolean
  networkId: number
  nodes: Node[]
  updatedAt: string // Date
  networkCode?: string
}
