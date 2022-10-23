export const NETWORK_ADDRESS_PATTERNS: { [ network: string ]: RegExp[] } = {
  "Xinfin": [/^xdc[0-9a-fA-F]{40}$/, /^xdc[0-9a-f]{40}$/, /^xdc?[0-9A-F]{40}$/],
  "Polygon": [/^0x[0-9a-fA-F]{40}$/, /^0x[0-9a-f]{40}$/, /^0x?[0-9A-F]{40}$/]
}