import React from 'react'
import { useGetNftData } from 'state/nft/hooks'
import { NFTCards } from './NFTCards'

const List = () => {
  useGetNftData()
  return (
    <>
      <div>My NFTS</div>
      <NFTCards />
    </>
  )
}
export default List
