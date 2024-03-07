import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { getName } from '../../utils/web3ReactUtils'
import { connectors } from 'connectors'

function Child() {
  const { connector } = useWeb3React()
  console.log(`Priority Connector is: ${getName(connector)}`)
  return null
}

export default function Web3Provider() {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Child />
    </Web3ReactProvider>
  )
}
