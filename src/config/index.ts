// export const API_URL = process.env.REACT_APP_API_URL
export const SECURITY_TOKENS = process.env.REACT_APP_SECURITY_TOKENS === 'true'
export const STAKING_CONTRACT_KOVAN =
  process.env.REACT_APP_STAKING_CONTRACT_KOVAN || '0xf49A087aA48C0A4f0dEa6428F1175e1bB45CDAa2'
export const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY
export const PINATA_SECRET_API_KEY = process.env.REACT_APP_PINATA_SECRET_API_KEY
export const API_URL = 'https://api.staging.ixswap.io/v1/' || process.env.REACT_APP_API_URL