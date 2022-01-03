import { withSentryRouting } from '@sentry/react'
import { Route } from 'react-router-dom'

// @ts-expect-error
export const SentryRoute = withSentryRouting(Route)
