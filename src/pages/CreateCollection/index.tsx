import { Trans } from '@lingui/macro'
import React, { useEffect } from 'react'
import { TYPE } from 'theme'
import { CollectionForm } from '../../components/CollectionForm'
import { Container, StyledTab } from '../CreateNFT/styleds'
import { useActiveWeb3React } from 'hooks/web3'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useHistory, useParams } from 'react-router-dom'
import {
  createFullNftCollection,
  updateNftCollection,
  useCollection,
  useCollectionFormState,
  useCreateFullCollection,
} from 'state/nft/hooks'

const CreateCollection = () => {
  const { account } = useActiveWeb3React()
  const history = useHistory()
  const { cover, logo, banner, name, description } = useCollectionFormState()
  const createCollection = useCreateFullCollection(history)
  if (!account) return <NFTConnectWallet />
  const onSubmit = async () => {
    createCollection({ cover, logo, banner, name, description })
  }
  return (
    <Container width={['100%']} maxWidth={'900px'}>
      <StyledTab>
        <TYPE.title4>
          <Trans>Create Collection</Trans>
        </TYPE.title4>
      </StyledTab>
      <CollectionForm onSubmit={onSubmit} actionName="Create" />
    </Container>
  )
}
export default CreateCollection
