import React from 'react'
import { useGetNftData } from 'state/nft/hooks'

const List = () => {
  useGetNftData()
  return <div>My NFTS</div>
}
export default List
