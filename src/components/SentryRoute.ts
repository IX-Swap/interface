import { withSentryRouting } from '@sentry/react'
import { Route } from 'react-router-dom'

export const SentryRoute = withSentryRouting(Route)
