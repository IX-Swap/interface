import React from 'react'

// import { Header } from 'pages/Launchpad/Header'
import { LaunchpadContainer } from 'pages/Launchpad'

import { useSetHideHeader } from 'state/application/hooks'
import Header from 'components/Header'
import { useWeb3React } from '@web3-react/core'
import { NotAvailablePage } from 'components/NotAvailablePage'

interface Props {
  background?: string
}

export const IssuancePageLayout: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const hideHeader = useSetHideHeader()
  const { account } = useWeb3React()

  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])

  if (!account) return <NotAvailablePage />

  return (
    <>
      <Header />
      <LaunchpadContainer background={props.background}>{props.children}</LaunchpadContainer>
    </>
  )
}
