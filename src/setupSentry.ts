import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { ENVIRONMENT } from 'config'
import { history } from 'config/history'

export const setupSentry = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      release: `ix-web-app@${APP_VERSION}`,
      environment: ENVIRONMENT,
      dsn: 'https://4afbf02fe87d483fa71d4c895010ac76@o461614.ingest.sentry.io/5463633',
      integrations: [
        new Integrations.BrowserTracing({
          routingInstrumentation: Sentry.reactRouterV5Instrumentation(history)
        })
      ],
      tracesSampleRate: 0
    })
  }
}
