import { Trans } from '@lingui/macro'
import React, { useEffect } from 'react'
import { TYPE } from 'theme'
import { CollectionForm } from '../../components/CollectionForm'
import { Container, StyledTab } from '../CreateNFT/styleds'
import { useActiveWeb3React } from 'hooks/web3'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useParams } from 'react-router-dom'
import { updateNftCollection, useCollection, useCollectionFormState } from 'state/nft/hooks'

const Update = () => {
  const { account } = useActiveWeb3React()
  const { cover, logo, banner, name, description } = useCollectionFormState()

  const { id }: { id: string } = useParams()
  const numberId = Number(id)
  const collection = useCollection(numberId)
  if (!account) return <NFTConnectWallet />
  const onSubmit = async () => {
    if (collection?.id) {
      updateNftCollection({ cover, logo, banner, name, description }, collection.id)
    }
  }
  return (
    <Container width={['100%']} maxWidth={'900px'}>
      <StyledTab>
        <TYPE.title4>
          <Trans>Update Collection</Trans>
        </TYPE.title4>
      </StyledTab>
      <CollectionForm onSubmit={onSubmit} collection={collection} actionName="Update" />
    </Container>
  )
}
export default Update
