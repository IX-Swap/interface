import { withSentryRouting } from '@sentry/react'
import { Route } from 'react-router-dom'

// @ts-ignore
export const SentryRoute = withSentryRouting(Route)
