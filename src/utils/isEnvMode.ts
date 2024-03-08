const isEnvMode = (mode: string[]) => {
  return mode.some((m) => window.location.hostname.startsWith(m)) // https://dev.ixswap.io/xxx -> hostname = dev.ixswap.io
}

export const isDevelopment = isEnvMode(['none'])
export const isStaging = isEnvMode(['none'])
export const isProd = isEnvMode(['localhost', 'app.ixswap.io', 'staging-client-demo.ixswap.io'])
