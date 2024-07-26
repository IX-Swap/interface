const isEnvMode = (mode: string[]) => {
  return mode.some((m) => window.location.hostname.startsWith(m)) // https://dev.ixswap.io/xxx -> hostname = dev.ixswap.io
}

export const isLocal = isEnvMode(['localhost'])
export const isDevelopment = isEnvMode(['dev.ixswap.io', 'localhost'])
export const isStaging = (process.env.REACT_APP_ENV || '').includes('staging')
export const isProd = (process.env.REACT_APP_ENV || '').includes('production')
