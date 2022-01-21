import { Trans } from '@lingui/macro'
import React, { useEffect } from 'react'
import { TYPE } from 'theme'
import { UpdateForm } from './UpdateForm'
import { Container, StyledTab } from '../CreateNFT/styleds'
import { useActiveWeb3React } from 'hooks/web3'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useParams } from 'react-router-dom'
import { useCollection } from 'state/nft/hooks'

const Update = () => {
  const { account } = useActiveWeb3React()
  const { id }: { id: string } = useParams()
  const numberId = Number(id)
  const collection = useCollection(numberId)
  console.log({ collection })
  if (!account) return <NFTConnectWallet />

  return (
    <Container width={['100%']} maxWidth={'900px'}>
      <StyledTab>
        <TYPE.title4>
          <Trans>Update Collection</Trans>
        </TYPE.title4>
      </StyledTab>
      <UpdateForm collection={collection} />
    </Container>
  )
}
export default Update
