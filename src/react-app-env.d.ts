/// <reference types="react-scripts" />

declare module 'react-lazy-load-image-component'
declare module '@metamask/jazzicon' {
  export default function (diameter: number, seed: number): HTMLElement
}

declare module 'fortmatic'

interface Window {
  ethereum?: {
    isMetaMask?: true
    request: (...args: any[]) => Promise<any>
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    autoRefreshOnNetworkChange?: boolean
  }
  web3?: Record<string, unknown>
  ym: (id: number, action: string, goal: string) => void
}

declare module 'content-hash' {
  declare function decode(x: string): string
  declare function getCodec(x: string): string
}

declare module 'multihashes' {
  declare function decode(buff: Uint8Array): { code: number; name: string; length: number; digest: Uint8Array }
  declare function toB58String(hash: Uint8Array): string
}
