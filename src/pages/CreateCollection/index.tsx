import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import { useHistory } from 'react-router-dom'
import { Box } from 'rebass'

import { TYPE } from 'theme'
import { Loadable } from 'components/LoaderHover'
import { useActiveWeb3React } from 'hooks/web3'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useCollectionFormState, useCreateFullCollection } from 'state/nft/hooks'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import AppBody from 'pages/AppBody'

import { CollectionForm } from '../../components/CollectionForm'

const CreateCollection = () => {
  const { account, chainId } = useActiveWeb3React()
  const history = useHistory()
  const [pending, setPending] = useState(false)

  const { cover, logo, banner, name, description, maxSupply } = useCollectionFormState()
  const createCollection = useCreateFullCollection(history)

  const blurred = !chainId || !TGE_CHAINS_WITH_SWAP.includes(chainId)

  if (!account) return <NFTConnectWallet />

  const onSubmit = async () => {
    setPending(true)

    try {
      await createCollection({ cover, logo, banner, name, description, maxSupply })
    } catch (error: any) {
      console.log({ error })
      setPending(false)
    }
  }

  return (
    <AppBody blurred={blurred} maxWidth="100%" transparent>
      <Loadable loading={pending}>
        <Box width={['100%']} maxWidth={'672px'} margin="auto">
          <TYPE.title4 style={{ textAlign: 'center', marginBottom: 32 }}>
            <Trans>Create Collection</Trans>
          </TYPE.title4>
          {!blurred && <CollectionForm onSubmit={onSubmit} actionName="Create Collection" />}
        </Box>
      </Loadable>
    </AppBody>
  )
}
export default CreateCollection
