const isEnvMode = (mode: string[]) => {
  return mode.some((m) => window.location.hostname.startsWith(m)) // https://dev.ixs.finance/xxx -> hostname = dev.ixs.finance
}

export const isLocal = isEnvMode(['localhost'])
export const isDevelopment = isEnvMode(['dev.ixs.finance', 'localhost'])
export const isStaging = (process.env.REACT_APP_ENV || '').includes('staging')
export const isProd = (process.env.REACT_APP_ENV || '').includes('production')
export const isTestnet = (process.env.REACT_APP_ENV || '').includes('development')
