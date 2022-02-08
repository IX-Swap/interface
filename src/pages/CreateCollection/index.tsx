import { Trans } from '@lingui/macro'
import React, { useEffect, useState } from 'react'
import { TYPE } from 'theme'
import { Loadable } from 'components/LoaderHover'
import { CollectionForm } from '../../components/CollectionForm'
import { Container, StyledTab } from '../CreateNFT/styleds'
import { useActiveWeb3React } from 'hooks/web3'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useHistory, useParams } from 'react-router-dom'
import { useCollectionFormState, useCreateFullCollection } from 'state/nft/hooks'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import AppBody from 'pages/AppBody'

const CreateCollection = () => {
  const { account, chainId } = useActiveWeb3React()
  const history = useHistory()
  const [pending, setPending] = useState(false)

  const { cover, logo, banner, name, description } = useCollectionFormState()
  const createCollection = useCreateFullCollection(history)

  const blurred = !chainId || !TGE_CHAINS_WITH_SWAP.includes(chainId)

  if (!account) return <NFTConnectWallet />

  const onSubmit = async () => {
    setPending(true)

    try {
      await createCollection({ cover, logo, banner, name, description })
    } catch (error: any) {
      console.log({ error })
      setPending(false)
    }
  }

  return (
    <AppBody blurred={blurred} maxWidth="100%" transparent>
      <Loadable loading={pending}>
        <Container width={['100%']} maxWidth={'900px'} margin="auto">
          <StyledTab>
            <TYPE.title4>
              <Trans>Create Collection</Trans>
            </TYPE.title4>
          </StyledTab>
          {!blurred && <CollectionForm onSubmit={onSubmit} actionName="Create" />}
        </Container>
      </Loadable>
    </AppBody>
  )
}
export default CreateCollection
