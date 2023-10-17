import React from 'react'

// import { Header } from 'pages/Launchpad/Header'
import { LaunchpadContainer } from 'pages/Launchpad'

import { useSetHideHeader } from 'state/application/hooks'
import Header from 'components/Header'

interface Props {
  background?: string
}

export const IssuancePageLayout: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const hideHeader = useSetHideHeader()

  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])

  return (
    <>
      <Header />
      <LaunchpadContainer background={props.background}>{props.children}</LaunchpadContainer>
    </>
  )
}
