const isEnvMode = (mode: string[]) => {
  return mode.some((m) => window.location.hostname.startsWith(m)) // https://dev.ixswap.io/xxx -> hostname = dev.ixswap.io
}

export const isDevelopment = isEnvMode(['dev.ixswap.io', 'localhost'])
export const isStaging = isEnvMode(['staging.ixswap.io'])
export const isProd = isEnvMode(['app.ixswap.io'])
