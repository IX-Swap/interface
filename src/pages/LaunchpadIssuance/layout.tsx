import React from 'react'

import { Header } from 'pages/Launchpad/Header'
import { LaunchpadContainer } from 'pages/Launchpad'

import { useSetHideHeader } from 'state/application/hooks'

export const IssuancePageLayout: React.FC<React.PropsWithChildren> = (props) => {
  const hideHeader = useSetHideHeader()

  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])

  return (
    <LaunchpadContainer>
      <Header />
      {props.children}
    </LaunchpadContainer>
  )
}
