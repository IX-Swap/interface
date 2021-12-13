export interface NFTAttribute {
  trait_type: string
  value: string | number
}

export interface NFTAttributeDisplay extends NFTAttribute {
  max_value: number
  display_type: string
}

export interface NFTImage {
  name: string
  description: string
  image: string
  date?: number
  attributes: (NFTAttribute | NFTAttributeDisplay)[]
}

export interface NFTState {
  readonly images: { [id: string]: NFTImage }
}
