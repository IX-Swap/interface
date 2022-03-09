import React from 'react'
import { Trans } from '@lingui/macro'

import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useActiveWeb3React } from 'hooks/web3'
import { TYPE } from 'theme'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import AppBody from 'pages/AppBody'

import { CreateForm } from './CreateForm'
import { Container } from './styleds'

const Create = () => {
  const { account, chainId } = useActiveWeb3React()

  const blurred = !chainId || !TGE_CHAINS_WITH_SWAP.includes(chainId)

  if (!account) return <NFTConnectWallet />

  return (
    <AppBody blurred={blurred} maxWidth="100%" transparent>
      <TYPE.title4 textAlign="center">
        <Trans>Create NFT</Trans>
      </TYPE.title4>
      <Container width={['100%']} maxWidth={'664px'} margin="32px auto">
        {!blurred && <CreateForm />}
      </Container>
    </AppBody>
  )
}
export default Create
