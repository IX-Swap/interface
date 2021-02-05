import { Box } from '@material-ui/core'
import React from 'react'
import classnames from 'classnames'
import { useStyles } from 'app/components/OnboardingPanel/OnboardingPanel.styles'
import { useOnboardingPanel } from 'app/components/OnboardingPanel/hooks/useOnboardingPanel'
import { OnboardingPanel } from 'app/components/OnboardingPanel/OnboardingPanel'
import { useSecurityRouter } from 'app/pages/security/router'
import { useLocation } from 'react-router-dom'
import { useHomeRouter } from 'app/pages/home/router'

export interface OnboardingContentWrapperProps {
  children: React.ReactNode
}

export const OnboardingContentWrapper = ({
  children
}: OnboardingContentWrapperProps) => {
  const { content, contentShift } = useStyles()
  const { open } = useOnboardingPanel()
  const { paths: securityPaths } = useSecurityRouter()
  const { paths: homePaths } = useHomeRouter()
  const { pathname } = useLocation()

  const onboardingPages = [...Object.values({ ...securityPaths, ...homePaths })]

  return !onboardingPages.includes(pathname) ? (
    <>{children}</>
  ) : (
    <Box display='flex' width='100%'>
      <Box className={classnames(content, { [contentShift]: open })}>
        {children}
      </Box>
      <OnboardingPanel />
    </Box>
  )
}
