import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import { TYPE } from 'theme'
import { CollectionForm } from '../../components/CollectionForm'
import { StyledTab } from '../CreateNFT/styleds'
import { useActiveWeb3React } from 'hooks/web3'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { Loadable } from 'components/LoaderHover'
import { useParams, useHistory } from 'react-router-dom'
import { useCollection, useCollectionFormState, useUpdateFullCollection } from 'state/nft/hooks'
import { Box } from 'rebass'

const Update = () => {
  const { account } = useActiveWeb3React()
  const history = useHistory()
  const [pending, setPending] = useState(false)
  const { cover, logo, banner, name, description } = useCollectionFormState()

  const { id }: { id: string } = useParams()
  const numberId = Number(id)
  const collection = useCollection(numberId)
  const updateCollection = useUpdateFullCollection(history)

  if (!account) return <NFTConnectWallet />

  const onSubmit = async () => {
    setPending(true)

    try {
      if (collection?.id) {
        updateCollection({
          cover,
          logo,
          banner,
          name,
          description,
          collectionId: collection.id,
          collectionAddress: collection.address,
        })
      }
    } catch (error: any) {
      console.log({ error })
      setPending(false)
    }
  }
  return (
    <>
      <Loadable loading={pending}>
        <Box width={['100%']} maxWidth={'672px'}>
          <StyledTab>
            <TYPE.title4 style={{ textAlign: 'center', marginBottom: 32 }}>
              <Trans>Update Collection</Trans>
            </TYPE.title4>
          </StyledTab>
          <CollectionForm onSubmit={onSubmit} collection={collection} actionName="Update Collection" />
        </Box>
      </Loadable>
    </>
  )
}
export default Update
