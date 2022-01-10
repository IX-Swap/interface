import { Trans } from '@lingui/macro'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { TYPE } from 'theme'
import { CreateForm } from './CreateForm'
import { Container, StyledTab } from './styleds'

const Create = () => {
  const { account } = useActiveWeb3React()

  if (!account) return <NFTConnectWallet />

  return (
    <Container width={['100%']} maxWidth={'900px'}>
      <StyledTab>
        <TYPE.title4>
          <Trans>Create NFT</Trans>
        </TYPE.title4>
      </StyledTab>
      <CreateForm />
    </Container>
  )
}
export default Create
