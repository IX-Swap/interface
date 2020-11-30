import React from 'react'
import { useAllNetworks } from 'v2/app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'

export interface NetworkViewProps {
  networkId: string
}

export const NetworkView = (props: NetworkViewProps) => {
  const { networkId } = props
  const { data, isLoading } = useAllNetworks()
  const network = data?.find(network => network._id === networkId)

  return isLoading ? <>'...' </> : <>{network?.name}</>
}
