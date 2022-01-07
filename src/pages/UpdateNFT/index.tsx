import { Trans } from '@lingui/macro'
import React from 'react'
import { TYPE } from 'theme'
import { UpdateForm } from './UpdateForm'
import { Container, StyledTab } from '../CreateNFT/styleds'
import { useActiveWeb3React } from 'hooks/web3'
import { NFTConnectWallet } from 'components/NFTConnectWallet'

const Update = () => {
  const { account } = useActiveWeb3React()

  if (!account) return <NFTConnectWallet />

  return (
    <Container width={['100%']} maxWidth={'900px'}>
      <StyledTab>
        <TYPE.title4>
          <Trans>Update NFT</Trans>
        </TYPE.title4>
      </StyledTab>
      <UpdateForm />
    </Container>
  )
}
export default Update
