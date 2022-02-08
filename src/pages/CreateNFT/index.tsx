import { Trans } from '@lingui/macro'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { TYPE } from 'theme'
import { CreateForm } from './CreateForm'
import { Container, StyledTab } from './styleds'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import AppBody from 'pages/AppBody'

const Create = () => {
  const { account, chainId } = useActiveWeb3React()

  const blurred = !chainId || !TGE_CHAINS_WITH_SWAP.includes(chainId)

  if (!account) return <NFTConnectWallet />

  return (
    <AppBody blurred={blurred} maxWidth="100%" transparent>
      <Container width={['100%']} maxWidth={'900px'} margin="auto">
        <StyledTab>
          <TYPE.title4>
            <Trans>Create NFT</Trans>
          </TYPE.title4>
        </StyledTab>
        {!blurred && <CreateForm />}
      </Container>
    </AppBody>
  )
}
export default Create
