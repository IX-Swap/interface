import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
// import { useGetNftData } from 'state/nft/hooks'
import { NFTCards } from './NFTCards'

const List = () => {
  const { account } = useActiveWeb3React()
  // useGetNftData()

  if (!account) return <NFTConnectWallet />

  return (
    <>
      <div>My NFTS</div>
      <NFTCards />
    </>
  )
}
export default List
